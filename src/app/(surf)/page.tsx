"use client";
import About from "../components/landing/About";
import Advantage from "../components/landing/Advantage";
import Cover from "../components/landing/Cover";
import Difference from "../components/landing/Difference";
import Footer from "../components/landing/Footer";
import Partners from "../components/landing/Partners";
import Show from "../components/landing/Show";
import { ICountry } from "@/types/country";
import { getCountries } from "../utils/getCountry";

// Framer Motion for reveal animations
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Helper component for reveal on scroll
const RevealOnScroll = dynamic(
  () =>
    Promise.resolve(function RevealOnScroll({
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
          controls.start("visible");
        }
      }, [controls, inView]);

      return (
        <motion.div
          ref={ref}
          initial="hidden"
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
          style={{ width: "100%" }}
        >
          {children}
        </motion.div>
      );
    }),
  { ssr: false }
);

export default function Home() {
  // Hydration-safe state for client-only code
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Only run on client
    const getCountriesList = async () => {
      try {
        const countriesData = await getCountries();
        if (typeof window !== "undefined") {
          // Use localStorage instead of Cookies to avoid hydration mismatch
          window.localStorage.setItem(
            "list",
            JSON.stringify(countriesData as ICountry[])
          );
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching countries:", error);
      }
    };
    getCountriesList();
  }, []);

  if (!hydrated) {
    // Avoid rendering until after hydration to prevent mismatch
    return null;
  }

  return (
    <main className="main__container">
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
        <Partners />
      </RevealOnScroll>
      <Footer />
    </main>
  );
}
