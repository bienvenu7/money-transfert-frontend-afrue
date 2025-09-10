"use client";
import React from "react";
import AnimatedGlobe from "../../components/AnimatedGlobe";
import AdvancedAnimatedGlobe from "../../components/AdvancedAnimatedGlobe";
import AnimatedSection from "../../components/AnimatedSection";
import ClientOnly from "../../components/ClientOnly";

export default function GlobeDemo() {
  return (
    <main className="globe-demo-container">
      <div className="globe-demo-header">
        <h1>Animated Globe Demo</h1>
        <p>Secure Global Money Transfers - Animated SVG</p>
      </div>

      <ClientOnly fallback={<div style={{ minHeight: "400px" }} />}>
        <AnimatedSection delay={0.1}>
          <div className="globe-demo-section">
            <h2>Basic Animated Globe</h2>
            <AnimatedGlobe />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="globe-demo-section">
            <h2>Advanced Animated Globe</h2>
            <AdvancedAnimatedGlobe />
          </div>
        </AnimatedSection>
      </ClientOnly>

      <div className="globe-demo-features">
        <h2>Animation Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🌍 Globe Rotation</h3>
            <p>Continuous 360° rotation with smooth linear animation</p>
          </div>
          <div className="feature-card">
            <h3>💳 Credit Card</h3>
            <p>Subtle scale and rotation animation while staying in place</p>
          </div>
          <div className="feature-card">
            <h3>💰 Money Bills</h3>
            <p>Orbital paths with different speeds and directions</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Security Lock</h3>
            <p>Gentle pulsing animation to emphasize security</p>
          </div>
        </div>
      </div>
    </main>
  );
}
