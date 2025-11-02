'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Phrases qui s'affichent progressivement
  const phrases = [
    'Bienvenue sur AFRUE',
    "Votre plateforme de transfert d'argent",
    'Sécurisé et rapide',
    'Partout en Afrique',
    'Prêt à commencer ?',
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Animation des phrases
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex(prev => {
        if (prev >= phrases.length - 1) {
          clearInterval(phraseInterval);
          // Délai avant de masquer l'écran de chargement
          setTimeout(() => {
            onLoadingComplete?.();
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500); // Chaque phrase s'affiche pendant 1.5 secondes

    return () => {
      clearInterval(phraseInterval);
    };
  }, [isLoading, onLoadingComplete, phrases.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
          className='loading-screen'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            overflow: 'hidden',
          }}
        >
          {/* Conteneur principal pour le texte */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: '90%',
              position: 'relative',
            }}
          >
            {/* Phrase actuelle avec animation */}
            <AnimatePresence mode='wait'>
              <motion.h1
                key={currentPhraseIndex}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.8,
                  rotateX: 90,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 1.1,
                  rotateX: -90,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.17, 0.67, 0.83, 0.67],
                  type: 'spring',
                  stiffness: 100,
                }}
                style={{
                  fontSize: 'clamp(2rem, 8vw, 4rem)',
                  fontWeight: '800',
                  color: '#ffffff',
                  margin: 0,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {phrases[currentPhraseIndex]}
              </motion.h1>
            </AnimatePresence>

            {/* Indicateur de progression visuel */}
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '3rem',
              }}
            >
              {phrases.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: index === currentPhraseIndex ? 1.3 : 1,
                    opacity: index <= currentPhraseIndex ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor:
                      index <= currentPhraseIndex
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.3)',
                    boxShadow:
                      index === currentPhraseIndex
                        ? '0 0 20px rgba(255,255,255,0.5)'
                        : 'none',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Effet de particules flottantes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y:
                  Math.random() *
                  (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -100],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
