import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CharactersSection.module.css';
import CharacterCard from './CharacterCard';
import HeroModal from '../HeroModal/HeroModal';
import { Character } from '../../types';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CharactersSection: React.FC = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    // Generar personajes con traducciones
    const characters: Character[] = [
        {
            id: 1,
            name: t('characters.ironMan.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg',
            description: t('characters.ironMan.description'),
            fullName: t('characters.ironMan.fullName'),
            powers: t('characters.ironMan.powers', { returnObjects: true }),
            history: t('characters.ironMan.history'),
            appearances: t('characters.ironMan.appearances', { returnObjects: true }),
            abilities: t('characters.ironMan.abilities')
        },
        {
            id: 2,
            name: t('characters.spiderMan.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/005smp_ons_crd_02.jpg',
            description: t('characters.spiderMan.description'),
            fullName: t('characters.spiderMan.fullName'),
            powers: t('characters.spiderMan.powers', { returnObjects: true }),
            history: t('characters.spiderMan.history'),
            appearances: t('characters.spiderMan.appearances', { returnObjects: true }),
            abilities: t('characters.spiderMan.abilities')
        },
        {
            id: 3,
            name: t('characters.thor.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/004tho_ons_crd_03.jpg',
            description: t('characters.thor.description'),
            fullName: t('characters.thor.fullName'),
            powers: t('characters.thor.powers', { returnObjects: true }),
            history: t('characters.thor.history'),
            appearances: t('characters.thor.appearances', { returnObjects: true }),
            abilities: t('characters.thor.abilities')
        },
        {
            id: 4,
            name: t('characters.captainAmerica.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/003cap_ons_crd_03.jpg',
            description: t('characters.captainAmerica.description'),
            fullName: t('characters.captainAmerica.fullName'),
            powers: t('characters.captainAmerica.powers', { returnObjects: true }),
            history: t('characters.captainAmerica.history'),
            appearances: t('characters.captainAmerica.appearances', { returnObjects: true }),
            abilities: t('characters.captainAmerica.abilities')
        },
        {
            id: 5,
            name: t('characters.blackWidow.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/011blw_ons_crd_04.jpg',
            description: t('characters.blackWidow.description'),
            fullName: t('characters.blackWidow.fullName'),
            powers: t('characters.blackWidow.powers', { returnObjects: true }),
            history: t('characters.blackWidow.history'),
            appearances: t('characters.blackWidow.appearances', { returnObjects: true }),
            abilities: t('characters.blackWidow.abilities')
        },
        {
            id: 6,
            name: t('characters.hulk.name'),
            imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/006hbb_ons_crd_03.jpg',
            description: t('characters.hulk.description'),
            fullName: t('characters.hulk.fullName'),
            powers: t('characters.hulk.powers', { returnObjects: true }),
            history: t('characters.hulk.history'),
            appearances: t('characters.hulk.appearances', { returnObjects: true }),
            abilities: t('characters.hulk.abilities')
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación del título
            gsap.fromTo(titleRef.current, 
                {
                    opacity: 0,
                    y: -50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animación de las tarjetas con stagger (optimizado para rendimiento)
            gsap.fromTo(gridRef.current?.children || [], 
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleCharacterClick = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    return (
        <section ref={sectionRef} className={styles.charactersSection} id="characters">
            <div className={styles.container}>
                <h2 ref={titleRef} className={styles.title}>{t('charactersSection.title')}</h2>
                <div ref={gridRef} className={styles.charactersGrid}>
                    {characters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            onClick={handleCharacterClick}
                        />
                    ))}
                </div>
            </div>
            <HeroModal 
                character={selectedCharacter} 
                onClose={handleCloseModal} 
            />
        </section>
    );
};

export default CharactersSection;