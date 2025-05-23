import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MovieSlider.module.css';
import { Movie } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const MovieSlider: React.FC = () => {
    const { t } = useLanguage();
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Crear películas con traducciones
    const movies: Movie[] = [
        { 
            id: 1, 
            title: t('movies.ironMan.title'), 
            releaseYear: 2008, // Números fijos para evitar problemas de tipo
            posterUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/ironman_lob_crd_01_4.jpg'
        },
        { 
            id: 2, 
            title: t('movies.avengers.title'), 
            releaseYear: 2012,
            posterUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/theavengers_lob_crd_03.jpg'
        },
        { 
            id: 3, 
            title: t('movies.blackPanther.title'), 
            releaseYear: 2018,
            posterUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/blackpanther_lob_crd_01_5.jpg'
        },
        { 
            id: 4, 
            title: t('movies.spiderMan.title'), 
            releaseYear: 2017,
            posterUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/spider-manhomecoming_lob_crd_02_1.jpg'
        },
        { 
            id: 5, 
            title: t('movies.thor.title'), 
            releaseYear: 2017,
            posterUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/thorragnarok_lob_crd_03.jpg'
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación de entrada del slider (optimizada para rendimiento)
            gsap.fromTo(sliderRef.current?.children || [], 
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        once: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const slideToIndex = (index: number) => {
        if (!sliderRef.current) return;
        
        const cardWidth = 320; // Ancho de cada tarjeta + margen
        const newPosition = -index * cardWidth;
        
        gsap.to(sliderRef.current, {
            x: newPosition,
            duration: 0.8,
            ease: "power2.out"
        });
        
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        const nextIndex = currentIndex < movies.length - 1 ? currentIndex + 1 : 0;
        slideToIndex(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : movies.length - 1;
        slideToIndex(prevIndex);
    };

    return (
        <div ref={containerRef} className={styles.movieSliderContainer}>
            <button 
                onClick={prevSlide} 
                className={`${styles.sliderButton} ${styles.prevButton}`}
                aria-label={t('movies.previousButton')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            
            <div className={styles.sliderWrapper}>
                <div ref={sliderRef} className={styles.slider}>
                    {movies.map((movie) => (
                        <div key={movie.id} className={styles.movieCard}>
                            <div className={styles.posterContainer}>
                                <div className={styles.posterPlaceholder}>
                                    <div className={styles.pulsatingCircle}></div>
                                </div>
                                <img 
                                    src={movie.posterUrl} 
                                    alt={movie.title}
                                    className={styles.poster}
                                    loading="lazy"
                                    onLoad={(e) => {
                                        // Animar entrada de la imagen cuando se carga
                                        gsap.to(e.target, {
                                            opacity: 1,
                                            duration: 0.5
                                        });
                                        // Ocultar placeholder
                                        gsap.to(e.currentTarget.previousElementSibling, {
                                            opacity: 0,
                                            duration: 0.3,
                                            display: 'none'
                                        });
                                    }}
                                    style={{ opacity: 0 }}
                                />
                                <div className={styles.overlay}>
                                    <div className={styles.playButton}>
                                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                            <polygon points="9,6 20,12 9,18" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.movieInfo}>
                                <h3 className={styles.movieTitle}>{movie.title}</h3>
                                <p className={styles.movieYear}>{movie.releaseYear}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={nextSlide} 
                className={`${styles.sliderButton} ${styles.nextButton}`}
                aria-label={t('movies.nextButton')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            
            <div className={styles.indicators}>
                {movies.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => slideToIndex(index)}
                        aria-label={`${t('movies.goToSlide')} ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieSlider;
