import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import LanguageWrapper from "@/components/LanguageWrapper";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import ScanLines from "@/components/ScanLines";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import SoundEffectsProvider from "@/components/SoundEffectsProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import nextDynamic from "next/dynamic";
import "./globals.css";

// Lazy load componentes pesados que não são críticos para o primeiro render
const ChatBot = nextDynamic(() => import("@/components/ChatBot"), { ssr: false });
const CustomCursor = nextDynamic(() => import("@/components/CustomCursor"), { ssr: false });



const siteUrl = "https://albertodimande.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alberto Dimande | Planificador Territorial Futurista",
    template: "%s | Alberto Dimande",
  },
  description:
    "Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web em Maputo, Moçambique.",
  keywords: [
    "planeamento urbano",
    "GIS",
    "ArcGIS",
    "QGIS",
    "desenvolvimento web",
    "Maputo",
    "Moçambique",
    "planeamento territorial",
    "ordenamento do território",
    "cartografia",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Alberto Dimande", url: siteUrl }],
  creator: "Alberto Dimande",
  icons: {
    icon: "/ALD Logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: siteUrl,
    siteName: "Alberto Dimande Portfolio",
    title: "Alberto Dimande | Planificador Territorial Futurista",
    description:
      "Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web em Maputo, Moçambique.",
    images: [
      {
        url: "/profile.JPG",
        width: 800,
        height: 800,
        alt: "Alberto Dimande",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alberto Dimande | Planificador Territorial Futurista",
    description:
      "Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web.",
    images: ["/profile.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/ALD Logo.svg" />
      </head>
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
                <Breadcrumbs />
                <main className="relative z-10">{children}</main>
                <Footer />
                <ChatBot />
                <ScrollToTop />
              </div>
            </SoundEffectsProvider>
          </LanguageWrapper>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
