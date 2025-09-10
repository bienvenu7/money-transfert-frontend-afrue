"use client";
import React from "react";
import AdvancedAnimatedGlobe from "./AdvancedAnimatedGlobe";
import ClientOnly from "./ClientOnly";

interface GlobeShowcaseProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function GlobeShowcase({
  title = "Secure Global Money Transfers",
  subtitle = "Experience seamless international transactions with AfruE",
  className = "",
}: GlobeShowcaseProps) {
  return (
    <section className={`globe-showcase ${className}`}>
      <div className="globe-showcase-content">
        <div className="globe-showcase-text">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <ClientOnly fallback={<div className="globe-placeholder" />}>
          <div className="globe-showcase-animation">
            <AdvancedAnimatedGlobe />
          </div>
        </ClientOnly>
      </div>
    </section>
  );
}
