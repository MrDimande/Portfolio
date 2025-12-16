const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Experiência Profissional",
  description: "Trajectória profissional de Alberto Dimande em planeamento territorial, GIS, desenvolvimento web e gestão de recursos humanos em Maputo, Moçambique.",
  keywords: [
    "Experiência Profissional",
    "Carreira",
    "Planeamento Territorial",
    "GIS",
    "Desenvolvimento Web",
    "Alberto Dimande",
    "Maputo",
  ],
  openGraph: {
    title: "Experiência Profissional | Alberto Dimande",
    description: "Trajectória profissional em planeamento territorial, GIS e desenvolvimento web.",
    url: `${siteUrl}/experience`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 1200,
        height: 630,
        alt: "Experiência Profissional de Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiência Profissional | Alberto Dimande",
    description: "Trajectória profissional em planeamento territorial, GIS e desenvolvimento web.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/experience`,
  },
};

export default function ExperienceLayout({ children }) {
  return children;
}
