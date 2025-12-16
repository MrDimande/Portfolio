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
  return children;
}
