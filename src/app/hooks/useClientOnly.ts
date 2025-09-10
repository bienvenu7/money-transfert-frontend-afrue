"use client";
import { useEffect, useState } from "react";

/**
 * Hook to ensure components only render on the client side
 * Prevents hydration mismatches by returning false during SSR
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access cookies on the client side
 * Returns null during SSR to prevent hydration mismatches
 */
export function useClientCookie(key: string) {
  const [value, setValue] = useState<string | null>(null);
  const isClient = useClientOnly();

  useEffect(() => {
    if (isClient) {
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${key}=`))
          ?.split("=")[1];
        setValue(cookieValue || null);
      } catch (error) {
        console.error(`Error reading cookie ${key}:`, error);
        setValue(null);
      }
    }
  }, [isClient, key]);

  return value;
}

/**
 * Hook to safely access localStorage on the client side
 * Returns null during SSR to prevent hydration mismatches
 */
export function useClientLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(null);
  const isClient = useClientOnly();

  useEffect(() => {
    if (isClient) {
      try {
        const storedValue = localStorage.getItem(key);
        setValue(storedValue);
      } catch (error) {
        console.error(`Error reading localStorage ${key}:`, error);
        setValue(null);
      }
    }
  }, [isClient, key]);

  return value;
}

/**
 * Hook to safely get window dimensions
 * Returns default values during SSR to prevent hydration mismatches
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const isClient = useClientOnly();

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial dimensions
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return dimensions;
}
