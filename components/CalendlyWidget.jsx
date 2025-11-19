"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CalendlyWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your Calendly username/event type
  const calendlyUrl = "https://calendly.com/alberto-dimande"; // Update this with your actual Calendly link

  return (
    <>
      {/* Calendly Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 glass-strong border border-neon-cyan rounded-lg text-neon-cyan font-semibold hover:glow-cyan transition-all"
      >
        <Calendar className="w-5 h-5" />
        Agendar Reunião
      </motion.button>

      {/* Calendly Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-[90vh] glass-strong rounded-2xl border border-neon-cyan/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white font-orbitron">
                <span className="text-neon-cyan">Agendar</span>{" "}
                <span className="text-neon-magenta">Reunião</span>
              </h2>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full glass border border-neon-cyan flex items-center justify-center text-neon-cyan hover:glow-cyan transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Calendly Embed */}
            <div className="h-[calc(90vh-80px)] w-full">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly Scheduling"
                className="rounded-b-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
