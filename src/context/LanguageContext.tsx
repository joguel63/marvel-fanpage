import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { i18n, Language } from '../i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, options?: { returnObjects?: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('marvelLanguage');
    return (savedLanguage === 'en' || savedLanguage === 'es') ? savedLanguage : 
           (navigator.language.startsWith('es') ? 'es' : 'en');
  });

  useEffect(() => {
    localStorage.setItem('marvelLanguage', language);
    document.documentElement.lang = language;
  }, [language]);

  // Función para obtener traducciones
  const t = (path: string, options?: { returnObjects?: boolean }): any => {
    const keys = path.split('.');
    let value: any = i18n[language];

    for (const key of keys) {
      if (value === undefined) return path;
      value = value[key];
    }

    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
