const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Projectos",
  description: "Portfolio de projectos de Alberto Dimande em GIS, planeamento territorial, desenvolvimento web e aplicações geoespaciais em Maputo, Moçambique.",
  keywords: [
    "Projectos GIS",
    "Planeamento Territorial",
    "Desenvolvimento Web",
    "Aplicações Geoespaciais",
    "React",
    "Next.js",
    "ArcGIS",
    "QGIS",
    "Alberto Dimande",
  ],
  openGraph: {
    title: "Projectos | Alberto Dimande",
    description: "Portfolio de projectos em GIS, planeamento territorial e desenvolvimento web.",
    url: `${siteUrl}/projects`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 1200,
        height: 630,
        alt: "Projectos de Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projectos | Alberto Dimande",
    description: "Portfolio de projectos em GIS, planeamento territorial e desenvolvimento web.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
