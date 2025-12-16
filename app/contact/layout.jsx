const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Contacto",
  description: "Entre em contacto com Alberto Dimande para projectos de planeamento territorial, GIS, desenvolvimento web ou consultoria em Maputo, Moçambique.",
  keywords: [
    "Contacto",
    "Alberto Dimande",
    "Planeamento Territorial",
    "GIS",
    "Desenvolvimento Web",
    "Consultoria",
    "Maputo",
  ],
  openGraph: {
    title: "Contacto | Alberto Dimande",
    description: "Entre em contacto para projectos de planeamento territorial, GIS ou desenvolvimento web.",
    url: `${siteUrl}/contact`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 1200,
        height: 630,
        alt: "Contacto - Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Alberto Dimande",
    description: "Entre em contacto para projectos de planeamento territorial, GIS ou desenvolvimento web.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({ children }) {
  return children;
}
