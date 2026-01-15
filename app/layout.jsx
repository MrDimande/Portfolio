import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import Providers from "@/components/Providers";
import ScanLines from "@/components/ScanLines";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import nextDynamic from "next/dynamic";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});


// Lazy load componentes pesados que não são críticos para o primeiro render
const AudioPlayer = nextDynamic(() => import("@/components/AudioPlayer"), { ssr: false });
const ChatBot = nextDynamic(() => import("@/components/ChatBot"), { ssr: false });
const CustomCursor = nextDynamic(() => import("@/components/CustomCursor"), { ssr: false });



const siteUrl = "https://dimande.vercel.app";

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
    "Planificador Territorial",
    "Alberto Dimande",
    "urban planning",
    "geographic information systems",
    "web development",
    "territorial planning",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      'pt-MZ': siteUrl,
      'en': `${siteUrl}?lang=en`,
      'es': `${siteUrl}?lang=es`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alberto Dimande - Territorial Planner | GIS Specialist | Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alberto Dimande | Planificador Territorial Futurista",
    description:
      "Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web.",
    images: ["/og-image.png"],
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/ALD Logo.svg" />
        <meta name="geo.region" content="MZ-MPM" />
        <meta name="geo.placename" content="Maputo" />
        <meta name="geo.position" content="-25.969248;32.573229" />
        <meta name="ICBM" content="-25.969248, 32.573229" />
      </head>
      <body className={`${orbitron.variable} ${poppins.variable} font-sans`}>
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Alberto Dimande',
            jobTitle: 'Planificador Territorial Futurista',
            description:
              'Especialista em Planeamento Territorial, GIS e Desenvolvimento Web em Maputo, Moçambique.',
            url: siteUrl,
            image: `${siteUrl}/profile.JPG`,
            sameAs: [
              'https://github.com/MrDimande',
              'https://www.linkedin.com/in/alberto-dimande-97817822b/',
              'https://instagram.com/mr.dimande',
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Maputo',
              addressCountry: 'MZ',
            },
            knowsAbout: [
              'Planeamento Territorial',
              'GIS',
              'ArcGIS',
              'QGIS',
              'Desenvolvimento Web',
              'React',
              'Next.js',
            ],
          }}
        />
        <Providers>
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
            <BreadcrumbStructuredData />
            <main className="relative z-10">{children}</main>
            <Footer />
            <ChatBot />
            <AudioPlayer />
            <ScrollToTop />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
