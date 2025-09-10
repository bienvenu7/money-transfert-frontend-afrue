"use client";
import { useClientOnly } from "../hooks/useClientOnly";
import { ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that only renders its children on the client side
 * Prevents hydration mismatches by showing fallback during SSR
 */
export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const isClient = useClientOnly();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
