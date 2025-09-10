"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedGlobe = () => {
  return (
    <div className="animated-globe-container">
      <svg
        width="600"
        height="600"
        viewBox="0 0 600 600"
        className="animated-globe-svg"
      >
        {/* Background */}
        <rect width="600" height="600" fill="#000000" />

        {/* Globe */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="120"
            fill="url(#globeGradient)"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Globe continents pattern */}
          <path
            d="M 200 250 Q 250 200 300 250 Q 350 200 400 250 Q 380 300 400 350 Q 350 400 300 350 Q 250 400 200 350 Q 220 300 200 250 Z"
            fill="#4a90e2"
            opacity="0.8"
          />
          <path
            d="M 220 280 Q 280 220 300 280 Q 320 220 380 280 Q 360 320 380 360 Q 320 380 300 360 Q 280 380 220 360 Q 240 320 220 280 Z"
            fill="#5ba3f5"
            opacity="0.6"
          />
        </motion.g>

        {/* Credit Card */}
        <motion.g
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect
            x="250"
            y="280"
            width="100"
            height="60"
            rx="8"
            fill="#1e3a8a"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Card Chip */}
          <rect x="260" y="290" width="15" height="12" rx="2" fill="#fbbf24" />

          {/* Card Text */}
          <text
            x="260"
            y="310"
            fill="#ffffff"
            fontSize="8"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
          >
            AFRU-E
          </text>

          {/* Card Number */}
          <text
            x="260"
            y="320"
            fill="#ffffff"
            fontSize="6"
            fontFamily="monospace"
          >
            1234 5678 0910 4567
          </text>

          {/* Valid Thru */}
          <text
            x="260"
            y="330"
            fill="#ffffff"
            fontSize="5"
            fontFamily="Arial, sans-serif"
          >
            VALID THRU 10/29
          </text>

          {/* Cardholder Name */}
          <text
            x="260"
            y="340"
            fill="#ffffff"
            fontSize="6"
            fontFamily="Arial, sans-serif"
          >
            VINCENT HAROKU
          </text>

          {/* Mastercard Logo */}
          <circle cx="320" cy="300" r="8" fill="#eb001b" />
          <circle cx="325" cy="300" r="8" fill="#f79e1b" />
          <circle cx="322.5" cy="300" r="8" fill="#ff5f00" />
        </motion.g>

        {/* Security Lock */}
        <motion.g
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect x="290" y="250" width="20" height="15" rx="3" fill="#ffffff" />
          <path
            d="M 295 250 Q 300 245 305 250 L 305 255 L 295 255 Z"
            fill="#ffffff"
          />
        </motion.g>

        {/* Orbital Paths for Money Bills */}
        <defs>
          <path
            id="orbit1"
            d="M 150 300 A 150 150 0 1 1 450 300 A 150 150 0 1 1 150 300"
            fill="none"
            stroke="none"
          />
          <path
            id="orbit2"
            d="M 180 300 A 120 120 0 1 1 420 300 A 120 120 0 1 1 180 300"
            fill="none"
            stroke="none"
          />
          <path
            id="orbit3"
            d="M 210 300 A 90 90 0 1 1 390 300 A 90 90 0 1 1 210 300"
            fill="none"
            stroke="none"
          />
          <linearGradient
            id="globeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* Money Bills on Orbit 1 */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="145" y="295" width="20" height="10" rx="2" fill="#22c55e" />
          <circle cx="155" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="435" y="295" width="20" height="10" rx="2" fill="#22c55e" />
          <circle cx="445" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        {/* Money Bills on Orbit 2 */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="175" y="295" width="20" height="10" rx="2" fill="#16a34a" />
          <circle cx="185" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="405" y="295" width="20" height="10" rx="2" fill="#16a34a" />
          <circle cx="415" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        {/* Money Bills on Orbit 3 */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="205" y="295" width="20" height="10" rx="2" fill="#15803d" />
          <circle cx="215" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="375" y="295" width="20" height="10" rx="2" fill="#15803d" />
          <circle cx="385" cy="300" r="3" fill="#ffffff" />
        </motion.g>

        {/* Additional Money Bill */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <rect x="300" y="150" width="20" height="10" rx="2" fill="#22c55e" />
          <circle cx="310" cy="155" r="3" fill="#ffffff" />
        </motion.g>
      </svg>
    </div>
  );
};

export default AnimatedGlobe;
