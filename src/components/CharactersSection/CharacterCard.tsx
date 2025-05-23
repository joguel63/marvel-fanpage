import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CharacterCard.module.css';
import { Character } from '../../types';

interface CharacterCardProps {
    character: Character;
    onClick: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
    const { t } = useLanguage();
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleMouseEnter = () => {
        const tl = gsap.timeline();
        
        tl.to(cardRef.current, { 
            scale: 1.08, 
            rotationY: 5,
            boxShadow: '0 20px 40px rgba(230, 36, 41, 0.4)',
            duration: 0.4,
            ease: "power2.out"
        })
        .to(imageRef.current, { 
            scale: 1.1,
            filter: 'brightness(1.1) contrast(1.1)',
            duration: 0.3
        }, "-=0.4")
        .to(contentRef.current, { 
            y: -5,
            duration: 0.3
        }, "-=0.3");
    };

    const handleMouseLeave = () => {
        const tl = gsap.timeline();
        
        tl.to(cardRef.current, { 
            scale: 1, 
            rotationY: 0,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            duration: 0.4,
            ease: "power2.out"
        })
        .to(imageRef.current, { 
            scale: 1,
            filter: 'brightness(1) contrast(1)',
            duration: 0.3
        }, "-=0.4")
        .to(contentRef.current, { 
            y: 0,
            duration: 0.3
        }, "-=0.3");
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        // Animación suave para mostrar la imagen cargada
        if (imageRef.current) {
            gsap.fromTo(imageRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5 }
            );
        }
    };

    return (
        <div
            className={styles.characterCard}
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(character)}
        >
            <div className={styles.imageContainer}>
                {!imageLoaded && (
                    <div className={styles.imagePlaceholder}>
                        <div className={styles.pulsatingCircle}></div>
                    </div>
                )}
                <img 
                    ref={imageRef}
                    src={character.imageUrl} 
                    alt={character.name} 
                    className={styles.characterImage} 
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                    onLoad={handleImageLoad}
                    loading="lazy"
                />
                <div className={styles.overlay}></div>
            </div>
            <div ref={contentRef} className={styles.cardContent}>
                <div className={styles.textContent}>
                    <h3 className={styles.characterName}>{character.name}</h3>
                    <p className={styles.characterDescription}>{character.description}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.viewMoreButton} 
                        title={t('heroModal.viewMore')}
                        aria-label={t('heroModal.viewMore')}
                    >
                        <span>+</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;