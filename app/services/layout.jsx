const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Serviços",
  description: "Serviços profissionais de planeamento territorial, análise GIS, desenvolvimento web, visualização de dados e tradução oferecidos por Alberto Dimande em Maputo, Moçambique.",
  keywords: [
    "Serviços GIS",
    "Planeamento Territorial",
    "Análise Espacial",
    "Desenvolvimento Web",
    "Visualização de Dados",
    "Tradução",
    "Consultoria",
    "Alberto Dimande",
  ],
  openGraph: {
    title: "Serviços | Alberto Dimande",
    description: "Serviços profissionais de planeamento territorial, análise GIS e desenvolvimento web.",
    url: `${siteUrl}/services`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 1200,
        height: 630,
        alt: "Serviços de Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serviços | Alberto Dimande",
    description: "Serviços profissionais de planeamento territorial, análise GIS e desenvolvimento web.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
