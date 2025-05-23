import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header/Header';
import CharactersSection from './components/CharactersSection/CharactersSection';
import MoviesSection from './components/MoviesSection/MoviesSection';
import SeeMoreButton from './components/SeeMoreButton/SeeMoreButton';
import Footer from './components/Footer/Footer';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import Spinner from './components/Spinner/Spinner';
import './styles/global.css';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ConfigurarScrollTrigger para secciones (limitando efectos para mejor rendimiento)
    ScrollTrigger.matchMedia({
      // Solo aplicar efectos avanzados en computadoras de escritorio
      "(min-width: 1024px)": function() {
        // Parallax en scroll
        gsap.to('.app', {
          scrollTrigger: {
            trigger: '.app',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          },
          backgroundPosition: '50% 100%',
          ease: 'none'
        });
      }
    });
    
    return () => {
      // Limpiar animaciones cuando se desmonta el componente
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Animación de entrada después de la carga
    const timeline = gsap.timeline();
    
    timeline.from('body', {
      opacity: 0.3,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  };

  return (
    <LanguageProvider>
      {isLoading && <Spinner onComplete={handleLoadingComplete} />}
      <div className="app">
        <ThemeToggle />
        <LanguageSelector />
        <Header />
        <CharactersSection />
        <SeeMoreButton />
        <MoviesSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;