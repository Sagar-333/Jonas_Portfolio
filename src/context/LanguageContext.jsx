import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const savedLang = localStorage.getItem("jsj_portfolio_lang");
      return savedLang === "da" ? "da" : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === "da" ? "da" : "en";
    setLanguageState(validLang);
    try {
      localStorage.setItem("jsj_portfolio_lang", validLang);
    } catch (e) {
      console.error("Failed to save language preference:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "da" : "en");
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
