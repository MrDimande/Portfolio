import StructuredData from '@/components/StructuredData';

const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Sobre Mim",
  description: "Conheça Alberto Dimande - Planificador Territorial Futurista, especialista em GIS, planeamento urbano e desenvolvimento web em Maputo, Moçambique.",
  keywords: [
    "Alberto Dimande",
    "Planificador Territorial",
    "GIS",
    "Planeamento Urbano",
    "Desenvolvimento Web",
    "Maputo",
    "Moçambique",
    "ArcGIS",
    "QGIS",
  ],
  openGraph: {
    title: "Sobre Mim | Alberto Dimande",
    description: "Conheça Alberto Dimande - Planificador Territorial Futurista, especialista em GIS e desenvolvimento web.",
    url: `${siteUrl}/about`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 800,
        height: 800,
        alt: "Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Mim | Alberto Dimande",
    description: "Conheça Alberto Dimande - Planificador Territorial Futurista, especialista em GIS e desenvolvimento web.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutLayout({ children }) {
  // Structured Data - Schema.org Person (já existe no layout principal, mas mais completo aqui)
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alberto Dimande',
    jobTitle: 'Planificador Territorial Futurista',
    description: 'Especialista em Planeamento Territorial, GIS e Desenvolvimento Web em Maputo, Moçambique.',
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
      addressRegion: 'Maputo',
      addressCountry: 'MZ',
    },
    knowsAbout: [
      'Planeamento Territorial',
      'Ordenamento do Território',
      'GIS',
      'ArcGIS',
      'QGIS',
      'Desenvolvimento Web',
      'React',
      'Next.js',
      'Cartografia',
      'Urbanismo',
      'Planeamento Urbano',
      'Sistemas de Informação Geográfica',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidade Pedagógica de Maputo',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Maputo',
        addressCountry: 'MZ',
      },
    },
    memberOf: [
      {
        '@type': 'Organization',
        name: 'BMC Pro Services',
        roleName: 'Director-Geral',
        url: 'https://www.bmcpro.co.mz',
      },
      {
        '@type': 'Organization',
        name: 'BrainyWrite – Assessoria Académica & Criativa',
        roleName: 'Fundador & Director-Geral',
      },
    ],
  };

  // Structured Data - Schema.org Organization (Portfolio Profissional)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alberto Dimande - Portfolio Profissional',
    alternateName: 'AD Portfolio',
    description: 'Portfolio profissional de Alberto Dimande, especialista em Planeamento Territorial, GIS e Desenvolvimento Web.',
    url: siteUrl,
    logo: `${siteUrl}/ALD Logo.svg`,
    image: `${siteUrl}/profile.JPG`,
    founder: {
      '@type': 'Person',
      name: 'Alberto Dimande',
      url: siteUrl,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maputo',
      addressRegion: 'Maputo',
      addressCountry: 'MZ',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Moçambique',
    },
    knowsAbout: [
      'Planeamento Territorial',
      'Ordenamento do Território',
      'GIS',
      'Desenvolvimento Web',
      'Cartografia',
      'Urbanismo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Professional',
      url: `${siteUrl}/contact`,
    },
    sameAs: [
      'https://github.com/MrDimande',
      'https://www.linkedin.com/in/alberto-dimande-97817822b/',
      'https://instagram.com/mr.dimande',
    ],
  };

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={organizationSchema} />
      {children}
    </>
  );
}
