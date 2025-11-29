"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, Video, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function CalendlyWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const calendlyUrl = "https://calendly.com/aldimande/30min";

  // Reset loading state quando abrir
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* Calendly Button - Melhorado */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 px-8 py-4 glass-strong border-2 border-neon-cyan/50 rounded-xl text-neon-cyan font-bold hover:border-neon-cyan transition-all duration-300 overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-magenta/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <Calendar className="w-6 h-6 relative z-10" />
        <span className="relative z-10 font-orbitron">Agendar Reunião</span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-neon-cyan/20" />
      </motion.button>

      {/* Calendly Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Enhanced Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/95 to-black/90"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4 
              }}
              className="relative w-full max-w-5xl h-[92vh] rounded-3xl overflow-hidden"
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-blue opacity-50 blur-sm" />
              
              {/* Inner container */}
              <div className="absolute inset-[2px] rounded-3xl bg-gray-900/95 backdrop-blur-xl overflow-hidden border border-white/10">
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-cyan/20 to-transparent blur-2xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-neon-magenta/20 to-transparent blur-2xl" />

                {/* Header */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-orbitron">
                        <span className="bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan bg-clip-text text-transparent">
                          Agendar Reunião
                        </span>
                      </h2>
                      <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        Escolha o melhor horário para você
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="group w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </motion.div>

                {/* Calendly Embed Container */}
                <div className="relative h-[calc(92vh-120px)] w-full">
                  {/* Loading State */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm z-10"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-4 border-neon-cyan/30 border-t-neon-cyan rounded-full"
                        />
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="mt-4 text-neon-cyan font-orbitron"
                        >
                          Carregando calendário...
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Calendly iframe */}
                  <motion.iframe
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    src={calendlyUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Calendly Scheduling"
                    className="rounded-b-3xl"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>

                {/* Footer Info */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent border-t border-white/5"
                >
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-neon-cyan" />
                      <span>Reunião via Google Meet</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neon-magenta" />
                      <span>30 minutos</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
