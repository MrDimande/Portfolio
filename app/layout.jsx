import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageWrapper from '@/components/LanguageWrapper'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'
import ChatBot from '@/components/ChatBot'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import ScanLines from '@/components/ScanLines'
import SoundEffectsProvider from '@/components/SoundEffectsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alberto Dimande | Planeador Territorial Futurista',
  description: 'Portfolio de Alberto Dimande - Especialista em Planeamento Territorial, GIS e Desenvolvimento Web',
  keywords: 'planeamento urbano, GIS, ArcGIS, QGIS, desenvolvimento web, Maputo, planeamento territorial',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className="dark">
      <body className={inter.className}>
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
                <main className="relative z-10">
                  {children}
                </main>
                <Footer />
                <ChatBot />
                <ScrollToTop />
              </div>
            </SoundEffectsProvider>
          </LanguageWrapper>
        </LanguageProvider>
      </body>
    </html>
  )
}

