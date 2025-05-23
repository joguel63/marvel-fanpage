import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { t } = useLanguage();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Timeline para coordinar las animaciones (optimizada)
        const tl = gsap.timeline({
            onComplete: () => {
                // Aplicar efecto de brillo cada 5 segundos para optimizar rendimiento
                gsap.to(titleRef.current, {
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 40px rgba(230, 36, 41, 0.8)",
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    repeatDelay: 4
                });
            }
        });

        // Animación del título principal (optimizada)
        tl.fromTo(titleRef.current, 
            { 
                opacity: 0, 
                y: -30, 
                scale: 0.8
            }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        )
        // Animación del subtítulo con delay (optimizada)
        .fromTo(subtitleRef.current, 
            { 
                opacity: 0, 
                y: 20, 
                scale: 0.9 
            }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }, 
            "-=0.3"
        );

    }, []);

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.backgroundParticles} aria-hidden="true">
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
                <div className={styles.particle}></div>
            </div>
            <h1 ref={titleRef} className={styles.title}>
                {t('header.title')}
            </h1>
            <h2 ref={subtitleRef} className={styles.subtitle}>
                {t('header.subtitle')}
            </h2>
        </header>
    );
};

export default Header;