"use client";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

/**
 * Higher-order component to dynamically import components with SSR disabled
 * This prevents hydration mismatches for components that rely on client-side APIs
 */
export function withNoSSR<T extends object>(
  Component: ComponentType<T>,
  fallback?: ComponentType<T>
) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: fallback ? () => <></> : () => null,
  });
}

/**
 * Dynamic import wrapper specifically for components that use cookies or localStorage
 */
export function withClientOnly<T extends object>(
  Component: ComponentType<T>,
  fallback?: ComponentType<T>
) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: fallback
      ? () => <></>
      : () => (
          <div className="loading__skeleton">
            <div className="loading__skeleton--top"></div>
            <div className="loading__skeleton--bottom"></div>
          </div>
        ),
  });
}
