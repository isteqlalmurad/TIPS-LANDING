'use client';

import { HeroUIProvider } from "@heroui/react";
import LenisProvider from "@/components/LenisProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <LenisProvider>
        {children}
      </LenisProvider>
    </HeroUIProvider>
  );
}