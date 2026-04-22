import os
import shutil
import pathlib

# Configurações
SOURCE_LANG = "pt"
TARGET_LANG = "en"
BASE_CONTENT_DIR = "content"

def translate_text(text):
    """
    Placeholder para integração com API (OpenAI, DeepL, etc.)
    Por enquanto, ele apenas prefixa o texto para simular a tradução.
    """
    if not text.strip():
        return text
    # Aqui você integraria a chamada de API
    return text

def process_file(source_path, target_path):
    print(f"Translating: {source_path} -> {target_path}")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Separa Front Matter do Conteúdo
    front_matter = []
    content = []
    is_front_matter = False
    
    for line in lines:
        if line.strip() == "---":
            is_front_matter = not is_front_matter
            front_matter.append(line)
            continue
        
        if is_front_matter:
            # Traduz apenas campos específicos do front matter se necessário
            if line.startswith("title:"):
                title = line.replace("title:", "").strip().strip('"')
                front_matter.append(f'title: "{translate_text(title)}"\n')
            else:
                front_matter.append(line)
        else:
            content.append(line)

    translated_content = translate_text("".join(content))
    
    # Garante o diretório de destino
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.writelines(front_matter)
        f.write(translated_content)

def sync_translations():
    source_dir = os.path.join(BASE_CONTENT_DIR, SOURCE_LANG)
    target_dir = os.path.join(BASE_CONTENT_DIR, TARGET_LANG)

    for root, dirs, files in os.walk(source_dir):
        for file in files:
            if file.endswith(".md"):
                source_path = os.path.join(root, file)
                # Calcula o caminho relativo para replicar no destino
                rel_path = os.path.relpath(source_path, source_dir)
                target_path = os.path.join(target_dir, rel_path)

                # Só traduz se o arquivo de destino não existir
                if not os.path.exists(target_path):
                    process_file(source_path, target_path)
                else:
                    print(f"Skipping (already exists): {rel_path}")

if __name__ == "__main__":
    sync_translations()
