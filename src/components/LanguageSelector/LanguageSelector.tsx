import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageSelector.module.css';
import { gsap } from 'gsap';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLang: 'en' | 'es') => {
    if (language !== newLang) {
      // Pequeña animación al cambiar el idioma
      gsap.to('body', {
        opacity: 0.8,
        duration: 0.2,
        onComplete: () => {
          setLanguage(newLang);
          gsap.to('body', {
            opacity: 1,
            duration: 0.2
          });
        }
      });
    }
  };

  return (
    <div className={styles.languageSelector}>
      <button 
        className={`${styles.languageButton} ${language === 'en' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label={t('languageSelector.en')}
        title={t('languageSelector.en')}
      >
        EN
      </button>
      <button 
        className={`${styles.languageButton} ${language === 'es' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('es')}
        aria-label={t('languageSelector.es')}
        title={t('languageSelector.es')}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSelector;
