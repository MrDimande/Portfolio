"use client";

import { motion } from "framer-motion";
import { Rocket, Building2 } from "lucide-react";
import CompanyCard from "./CompanyCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EntrepreneurshipSection() {
  const { t } = useLanguage();

  const companies = [
    {
      name: "BMC Pro Services",
      role: "Director-Geral",
      period: "2024 - Presente",
      description:
        "Gestão estratégica, liderança de equipas e inovação empresarial. Foco em soluções profissionais de alta qualidade e desenvolvimento sustentável.",
      skills: [
        "Liderança",
        "Gestão de empresas",
        "Gestão de equipas",
        "Planeamento estratégico",
        "Visão empreendedora",
        "Inovação",
      ],
      link: "https://www.bmcpro.co.mz",
    },
    {
      name: "BrainyWrite – Assessoria Académica & Criativa",
      role: "Fundador & Director-Geral",
      period: "2023 - Presente",
      description:
        "Assessoria académica e criativa com foco em qualidade e inovação. Desenvolvimento de soluções educacionais e criativas personalizadas.",
      skills: [
        "Comunicação eficaz",
        "Criatividade",
        "Gestão de tempo",
        "Orientação para resultados",
        "Pensamento crítico",
      ],
      link: null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <Rocket className="w-8 h-8 text-neon-cyan" />
          <h2 className="text-3xl sm:text-4xl font-bold font-orbitron">
            <span className="text-neon-cyan">Empreendimentos</span>{" "}
            <span className="text-neon-magenta">&</span>{" "}
            <span className="text-neon-blue">Direção</span>
          </h2>
          <Building2 className="w-8 h-8 text-neon-magenta" />
        </motion.div>
        <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-blue mx-auto mb-4" />
        <p className="text-gray-400 max-w-2xl mx-auto">
          Liderança empresarial e empreendedorismo em projectos inovadores
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company, index) => (
          <CompanyCard
            key={company.name}
            name={company.name}
            role={company.role}
            period={company.period}
            description={company.description}
            skills={company.skills}
            link={company.link}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
