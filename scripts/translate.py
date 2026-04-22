import os
import sys
import time
import re
from deep_translator import GoogleTranslator

# Configurações
SOURCE_LANG = "pt"
TARGET_LANG = "en"
BASE_CONTENT_DIR = "content"

def translate_with_retries(text, source, target, retries=3):
    """
    Traduz o texto com tentativas repetidas e backoff exponencial.
    Garante que a pipeline não quebre por instabilidade momentânea da API do Google.
    """
    if not text.strip():
        return text
        
    for attempt in range(retries):
        try:
            # Pausa de 1.5s para não ativar o limitador de taxa (Rate Limit) do Google nas GitHub Actions
            time.sleep(1.5)
            translator = GoogleTranslator(source=source, target=target)
            return translator.translate(text)
        except Exception as e:
            print(f"⚠️ Aviso: Falha na tradução (Tentativa {attempt + 1}/{retries}). Erro: {e}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt) # Espera 1s, 2s, 4s...
            else:
                print("❌ Erro Crítico: Tradução falhou após todas as tentativas. Interrompendo pipeline para evitar commit parcial.")
                sys.exit(1)

def mask_markdown(text):
    """Protege códigos inline (ex: `variavel`) contra a tradução do Google."""
    # Envolve `codigo` em tags HTML que o Google Translate ignora nativamente
    return re.sub(r'(`[^`]+`)', r'<span translate="no">\1</span>', text)

def unmask_markdown(text):
    """Remove a proteção HTML após a tradução."""
    # O Google às vezes adiciona espaços ao redor das tags HTML, por isso usamos regex
    unmasked = re.sub(r'<\s*span[^>]*translate=["\']no["\'][^>]*>\s*(.*?)\s*<\s*/span\s*>', r'\1', text, flags=re.IGNORECASE)
    # Fallback de segurança para garantir limpeza
    unmasked = unmasked.replace('<span translate="no">', '').replace('</span>', '')
    return unmasked

def translate_text(text, source=SOURCE_LANG, target=TARGET_LANG):
    """Pipeline de tradução seguro para Markdown (Mascarar -> Traduzir -> Desmascarar)."""
    if not text.strip():
        return text
    
    masked_text = mask_markdown(text)
    translated_text = translate_with_retries(masked_text, source, target)
    final_text = unmask_markdown(translated_text)
    
    return final_text

def process_file(source_path, target_path):
    print(f"Translating: {source_path} -> {target_path}")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    front_matter = []
    content_lines = []
    is_front_matter = False
    
    # 1. Separar Front Matter do Conteúdo
    for line in lines:
        if line.strip() == "---":
            is_front_matter = not is_front_matter
            front_matter.append(line)
            continue
        
        if is_front_matter:
            if line.startswith("title:"):
                title = line.replace("title:", "").strip().strip('"').strip("'")
                front_matter.append(f'title: "{translate_text(title)}"\n')
            elif line.startswith("excerpt:"):
                excerpt = line.replace("excerpt:", "").strip().strip('"').strip("'")
                front_matter.append(f'excerpt: "{translate_text(excerpt)}"\n')
            else:
                front_matter.append(line)
        else:
            content_lines.append(line)

    # 2. Processar o conteúdo protegendo grandes blocos de código
    translated_content = []
    in_code_block = False
    text_buffer = []

    def translate_and_flush_buffer():
        if not text_buffer:
            return ""
        text_to_translate = "".join(text_buffer)
        text_buffer.clear()
        
        if not text_to_translate.strip():
            return text_to_translate
            
        return translate_text(text_to_translate) + "\n"

    for line in content_lines:
        if line.strip().startswith("```"):
            # Traduz tudo o que foi acumulado antes do bloco de código
            if text_buffer:
                translated_content.append(translate_and_flush_buffer())
            
            in_code_block = not in_code_block
            translated_content.append(line)
        elif in_code_block:
            # Preserva o bloco de código original sem traduzir
            translated_content.append(line)
        else:
            # Acumula texto normal
            text_buffer.append(line)
            
            # Para manter o contexto e evitar limite de 5000 chars, traduzimos parágrafo a parágrafo.
            if line.strip() == "":
                translated_content.append(translate_and_flush_buffer())

    # Traduz qualquer texto que tenha sobrado no buffer
    if text_buffer:
        translated_content.append(translate_and_flush_buffer())
    
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(front_matter)
        f.writelines(translated_content)

def sync_translations():
    source_dir = os.path.join(BASE_CONTENT_DIR, SOURCE_LANG)
    target_dir = os.path.join(BASE_CONTENT_DIR, TARGET_LANG)
    
    if not os.path.exists(source_dir):
        print(f"Diretório fonte '{source_dir}' não encontrado.")
        sys.exit(1)

    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".md"):
                source_path = os.path.join(root, file)
                rel_path = os.path.relpath(source_path, source_dir)
                target_path = os.path.join(target_dir, rel_path)

                if not os.path.exists(target_path):
                    process_file(source_path, target_path)
                else:
                    print(f"Skipping (already exists): {rel_path}")

if __name__ == "__main__":
    print("Iniciando rotina de tradução segura (CI/CD Mode)...")
    sync_translations()
    print("Tradução concluída com sucesso!")
