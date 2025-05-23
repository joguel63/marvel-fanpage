import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Character } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import styles from './HeroModal.module.css';

interface HeroModalProps {
    character: Character | null;
    onClose: () => void;
}

const HeroModal: React.FC<HeroModalProps> = ({ character, onClose }) => {
    const { t } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const handleClose = useCallback(() => {
        // Animar el cierre del modal
        const tl = gsap.timeline({
            onComplete: onClose
        });
        
        // Animar elementos internos primero
        const elements = contentRef.current?.querySelectorAll('.heroDetails > *, .section, .powerItem, .appearanceItem');
        if (elements) {
            gsap.to(elements, { 
                opacity: 0, 
                y: -10, 
                stagger: 0.02, 
                duration: 0.3, 
                ease: 'power2.in'
            });
        }
        
        tl.to(contentRef.current, { 
            y: 50, 
            opacity: 0, 
            scale: 0.9,
            duration: 0.4, 
            ease: 'power2.in',
            delay: 0.1
        })
        .to(modalRef.current, { 
            opacity: 0, 
            duration: 0.3,
            backdropFilter: 'blur(0px)'
        }, '-=0.2')
        .set(modalRef.current, { display: 'none' });
    }, [onClose]);
    
    useEffect(() => {
        if (character) {
            // Animar la apertura del modal
            const tl = gsap.timeline();
            
            tl.set(modalRef.current, { display: 'flex' })
              .fromTo(modalRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.4 }
              )
              .fromTo(contentRef.current, 
                { y: 50, opacity: 0, scale: 0.9 }, 
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }, 
                '-=0.2'
              );

            // Animar elementos dentro del modal de forma escalonada
            const elements = contentRef.current?.querySelectorAll('.heroDetails > *, .section, .powerItem, .appearanceItem');
            if (elements) {
                gsap.fromTo(elements, 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, delay: 0.2 }
                );
            }
              
            // Bloquear el scroll del body
            document.body.style.overflow = 'hidden';
            
            // Event listener para cerrar con ESC
            const handleEscKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    handleClose();
                }
            };
            
            document.addEventListener('keydown', handleEscKey);
            
            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscKey);
            };
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [character, handleClose]);const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalRef.current) {
            handleClose();
        }
    };
    
    // Si no hay personaje, no renderizamos el modal
    if (!character) return null;

    return (
        <div 
            ref={modalRef} 
            className={styles.modalOverlay} 
            onClick={handleOverlayClick}
        >
            <div ref={contentRef} className={styles.modalContent}>
                <button 
                    className={styles.closeButton} 
                    onClick={handleClose}
                    aria-label={t('heroModal.close')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <div className={styles.heroDetails}>
                    <div className={styles.heroImageContainer}>
                        <img 
                            src={character.imageUrl} 
                            alt={character.name} 
                            className={styles.heroImage}
                        />
                    </div>
                    
                    <div className={styles.heroInfo}>
                        <h2 className={styles.heroName}>{character.name}</h2>
                        {character.fullName && (
                            <p className={styles.heroRealName}>
                                <span className={styles.infoLabel}>{t('heroModal.realName')}:</span> {character.fullName}
                            </p>
                        )}
                        
                        <p className={styles.heroDescription}>{character.description}</p>
                        
                        {character.powers && character.powers.length > 0 && (
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>{t('heroModal.powers')}</h3>
                                <ul className={styles.powersList}>
                                    {character.powers.map((power, index) => (
                                        <li key={index} className={styles.powerItem}>{power}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {character.abilities && (
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>{t('heroModal.abilities')}</h3>
                                <p className={styles.abilitiesText}>{character.abilities}</p>
                            </div>
                        )}
                        
                        {character.history && (
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>{t('heroModal.history')}</h3>
                                <p className={styles.historyText}>{character.history}</p>
                            </div>
                        )}
                        
                        {character.appearances && character.appearances.length > 0 && (
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>{t('heroModal.appearances')}</h3>
                                <div className={styles.appearancesList}>
                                    {character.appearances.map((appearance, index) => (
                                        <span key={index} className={styles.appearanceItem}>{appearance}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroModal;
