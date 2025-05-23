import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import styles from './SeeMoreButton.module.css';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

const SeeMoreButton: React.FC = () => {
    const { t } = useLanguage();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación de entrada
            gsap.fromTo(buttonRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animación de pulso optimizada (menos intensiva)
            gsap.to(buttonRef.current, {
                scale: 1.03,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleClick = () => {
        // Animación del botón al hacer clic
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });

        // Scroll suave a la sección de películas
        const moviesSection = document.getElementById('movies');
        if (moviesSection) {
            moviesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={containerRef} className={styles.buttonContainer}>
            <button 
                ref={buttonRef}
                className={styles.seeMoreButton} 
                onClick={handleClick}
            >
                <span className={styles.buttonText}>{t('seeMoreButton')}</span>
                <div className={styles.buttonIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M7 13L12 18L17 13" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <path 
                            d="M7 7L12 12L17 7" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

export default SeeMoreButton;