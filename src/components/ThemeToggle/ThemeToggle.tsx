import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const { t } = useLanguage();
    
    // Aplicar el tema inicial al cargar la página
    useEffect(() => {
        const savedTheme = localStorage.getItem('marvelTheme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
            applyTheme(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        // Animación de transición de tema
        const tl = gsap.timeline({
            onComplete: () => {
                setIsDark(prevState => !prevState);
                applyTheme(!isDark);
                setIsAnimating(false);
            }
        });
        
        tl.to('body', {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.inOut'
        })
        .to('body', {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut'
        });
    };

    const applyTheme = (dark: boolean) => {
        if (dark) {
            // Tema oscuro (colores predeterminados)
            document.documentElement.style.setProperty('--dark-blue', '#1e3a5f');
            document.documentElement.style.setProperty('--dark-gray', '#2c2c2c');
            localStorage.setItem('marvelTheme', 'dark');
        } else {
            // Tema claro
            document.documentElement.style.setProperty('--dark-blue', '#d4e5ff');
            document.documentElement.style.setProperty('--dark-gray', '#f0f0f0');
            localStorage.setItem('marvelTheme', 'light');
        }
    };

    return (
        <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label={isDark ? t('themeToggle.light') : t('themeToggle.dark')}
        >
            {isDark ? (
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
