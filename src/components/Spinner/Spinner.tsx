import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Spinner.module.css';

interface SpinnerProps {
    onComplete?: () => void;
}

const Spinner: React.FC<SpinnerProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const { t } = useLanguage();
    
    useEffect(() => {
        // Simular tiempo de carga (3 segundos)
        const timer = setTimeout(() => {
            gsap.to(`.${styles.spinnerOverlay}`, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setIsVisible(false);
                    if (onComplete) onComplete();
                }
            });
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [onComplete]);
    
    if (!isVisible) return null;
    
    return (
        <div className={styles.spinnerOverlay}>
            <div className={styles.spinner}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <span className={styles.spinnerText}>{t('spinner.loading')}</span>
            </div>
        </div>
    );
};

export default Spinner;
