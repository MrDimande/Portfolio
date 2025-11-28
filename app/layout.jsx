import ChatBot from "@/components/ChatBot";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import LanguageWrapper from "@/components/LanguageWrapper";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import ScanLines from "@/components/ScanLines";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import SoundEffectsProvider from "@/components/SoundEffectsProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "Alberto Dimande | Planificador Territorial Futurista",
  description:
    "Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web",
  keywords:
    "planeamento urbano, GIS, ArcGIS, QGIS, desenvolvimento web, Maputo, planeamento territorial",
  icons: {
    icon: "/ALD Logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="dark">
      <body className="font-sans">
        <LanguageProvider>
          <LanguageWrapper>
            <SoundEffectsProvider>
              <div className="relative min-h-screen">
                <div className="grid-pattern fixed inset-0 pointer-events-none z-0" />
                <div className="fixed inset-0 pointer-events-none z-0">
                  <ParticlesBackground />
                </div>
                <ScanLines />
                <ScrollProgress />
                <CustomCursor />
                <Navbar />
                <main className="relative z-10">{children}</main>
                <Footer />
                <ChatBot />
                <ScrollToTop />
              </div>
            </SoundEffectsProvider>
          </LanguageWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
