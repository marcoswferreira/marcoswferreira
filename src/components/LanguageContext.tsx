"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      blog: "Blog",
    },
    home: {
      role: "Senior Software Engineer",
      hero_title: "Building <span class='text-sky-500'>resilient</span> systems and <span class='text-sky-500'>high-performance</span> APIs.",
      hero_desc: "Specialist in distributed architectures and critical financial systems. With experience at companies like Western Union, focused on solving complex problems with clean, scalable code.",
      contact: "Contact",
      stack: "Tech Stack",
      blog_notes: "Blog Notes",
      view_all: "View all",
      latest_posts: "Latest Posts",
      fin_systems: "Financial Systems",
      fin_desc: "Expert in Pix, QR Code, and payment methods.",
      mentorship: "Technical Mentorship",
      mentorship_desc: "Focused on spreading best practices and clean architecture.",
      clean_arch: "Clean Architecture",
      clean_desc: "Scalable and easy-to-maintain systems over the long term.",
    },
    about: {
      title: "About me",
      back: "Back to Home",
      desc: "A deep dive into my journey as a Senior Software Engineer.",
      summary_title: "Professional Summary",
      summary_p1: "Senior Software Engineer with 4+ years of experience designing and delivering high-impact backend systems in large-scale, mission-critical environments.",
      summary_p2: "Specialized in scalable and resilient distributed systems, with a strong background in the financial sector, including payment solutions (PayIn/Payout), Pix, banking integrations, QR Code generation and processing, and high-concurrency, low-latency APIs.",
      summary_p3: "Recently embedded at Western Union, one of the world's largest financial services companies, where I developed high-throughput APIs and async workers processing millions of daily requests, and designed microservices for high-availability enterprise applications.",
      delivery_title: "What I Deliver",
      highlights_title: "Career Highlights",
      passion: "Passionate about software engineering, architecture, and solving complex problems at scale. I also invest in technical mentorship and knowledge sharing within engineering teams.",
      open: "Currently open to senior engineering roles at companies building high-impact products.",
      cta: "Let's talk?",
    },
    blog: {
      title: "Blog",
      desc: "Technical articles, tutorials, and project documentation.",
      back: "Back to blog",
      back_all: "Back to all posts",
      tags: "Tags",
      categories: "Categories",
      other_tags: "Other Tags",
      latest: "Latest Posts",
      results: "results found",
      no_results: "No posts found for your search.",
      search_placeholder: "Search posts, technologies, or snippets...",
    }
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      blog: "Blog",
    },
    home: {
      role: "Engenheiro de Software Sênior",
      hero_title: "Construindo sistemas <span class='text-sky-500'>resilientes</span> e APIs de <span class='text-sky-500'>alta performance</span>.",
      hero_desc: "Especialista em arquiteturas distribuídas e sistemas financeiros críticos. Com passagens por empresas como Western Union, foco em resolver problemas complexos com código limpo e escalável.",
      contact: "Contato",
      stack: "Stack Tecnológica",
      blog_notes: "Notas do Blog",
      view_all: "Ver tudo",
      latest_posts: "Últimos Posts",
      fin_systems: "Sistemas Financeiros",
      fin_desc: "Especialista em Pix, QR Code e meios de pagamento.",
      mentorship: "Mentoria Técnica",
      mentorship_desc: "Focado em disseminar boas práticas e arquitetura limpa.",
      clean_arch: "Clean Architecture",
      clean_desc: "Sistemas escaláveis e fáceis de manter a longo prazo.",
    },
    about: {
      title: "Sobre mim",
      back: "Voltar para Início",
      desc: "Um mergulho profundo na minha trajetória como Engenheiro de Software Senior.",
      summary_title: "Resumo Profissional",
      summary_p1: "Engenheiro de Software Sênior com mais de 4 anos de experiência projetando e entregando sistemas backend de alto impacto em ambientes de grande escala e missão crítica.",
      summary_p2: "Especializado em sistemas distribuídos escaláveis e resilientes, com forte atuação no setor financeiro, incluindo soluções de pagamento (PayIn/Payout), Pix, integrações bancárias, geração e processamento de QR Codes e APIs de alta concorrência e baixa latência.",
      summary_p3: "Recentemente, atuei na Western Union, uma das maiores empresas de serviços financeiros do mundo, onde desenvolvi APIs de alto rendimento e workers assíncronos que processam milhões de requisições diárias, além de projetar microsserviços para aplicações corporativas de alta disponibilidade.",
      delivery_title: "O que eu entrego",
      highlights_title: "Destaques de Carreira",
      passion: "Apaixonado por engenharia de software, arquitetura e resolução de problemas complexos em escala. Também invisto em mentoria técnica e compartilhamento de conhecimento dentro das equipes de engenharia.",
      open: "Atualmente aberto a funções de engenharia sênior em empresas que constroem produtos de alto impacto.",
      cta: "Vamos conversar?",
    },
    blog: {
      title: "Blog",
      desc: "Artigos técnicos, tutoriais e documentação de projetos.",
      back: "Voltar para o blog",
      back_all: "Voltar para todos os posts",
      tags: "Tags",
      categories: "Categorias",
      other_tags: "Outras Tags",
      latest: "Últimos Posts",
      results: "resultados encontrados",
      no_results: "Nenhum post encontrado para sua busca.",
      search_placeholder: "Buscar posts, tecnologias ou snippets...",
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (path: string) => {
    return path.split(".").reduce((obj, key) => obj?.[key], translations[language] as any);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
