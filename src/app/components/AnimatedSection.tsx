"use client";
import { motion, Variants, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

// Animation variants with improved performance
const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoother animation
      staggerChildren: 0.1,
    },
  },
};

// Stagger animation for child elements
const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  threshold = 0.3,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px 0px -50px 0px",
    amount: threshold,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
      className={className}
      style={{
        willChange: "transform, opacity", // Optimize for animations
      }}
    >
      <motion.div variants={childVariants} transition={{ delay }}>
        {children}
      </motion.div>
    </motion.section>
  );
}
