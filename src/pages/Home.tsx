import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MainLayout from '@/components/layouts/MainLayout';
import About from '@/components/main/About';
import Advantage from '@/components/main/Advantage';
import Cover from '@/components/main/Cover';
import Difference from '@/components/main/Difference';
import LoadingScreen from '@/components/main/LoadingScreen';
import Partners from '@/components/main/Partners';
import QuizTwo from '@/components/main/QuizTwo';
import Show from '@/components/main/Show';
// import { getCountries } from '../utils/getCountry';
// import { ICountry } from "@/types/country"; // assume types if needed

// RevealOnScroll component for reveal animations
function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.17, 0.67, 0.83, 0.67],
      }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingScreen
        isLoading={true}
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
      />
      <MainLayout>
        <main className='main__container'>
          <RevealOnScroll delay={0}>
            <Cover />
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <About />
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <Difference />
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <Advantage />
          </RevealOnScroll>
          <RevealOnScroll delay={0.4}>
            <Show />
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <QuizTwo />
          </RevealOnScroll>
          <RevealOnScroll delay={0.6}>
            <Partners />
          </RevealOnScroll>
        </main>
      </MainLayout>
    </>
  );
};

export default Home;
