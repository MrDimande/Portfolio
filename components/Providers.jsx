'use client'

import LanguageWrapper from "@/components/LanguageWrapper";
import SoundEffectsProvider from "@/components/SoundEffectsProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <LanguageWrapper>
        <SoundEffectsProvider>
          {children}
        </SoundEffectsProvider>
      </LanguageWrapper>
    </LanguageProvider>
  );
}
