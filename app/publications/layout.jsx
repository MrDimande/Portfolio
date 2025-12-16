const siteUrl = "https://dimande.vercel.app";

export const metadata = {
  title: "Publicações",
  description: "Artigos académicos, papers técnicos e publicações de Alberto Dimande sobre planeamento territorial, GIS, urbanismo e desenvolvimento urbano sustentável.",
  keywords: [
    "Publicações",
    "Artigos Académicos",
    "Planeamento Territorial",
    "GIS",
    "Urbanismo",
    "Alberto Dimande",
    "Papers Técnicos",
  ],
  openGraph: {
    title: "Publicações | Alberto Dimande",
    description: "Artigos e publicações sobre planeamento territorial, GIS e urbanismo.",
    url: `${siteUrl}/publications`,
    siteName: "Alberto Dimande Portfolio",
    images: [
      {
        url: `${siteUrl}/profile.JPG`,
        width: 1200,
        height: 630,
        alt: "Publicações de Alberto Dimande",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publicações | Alberto Dimande",
    description: "Artigos e publicações sobre planeamento territorial, GIS e urbanismo.",
    images: [`${siteUrl}/profile.JPG`],
  },
  alternates: {
    canonical: `${siteUrl}/publications`,
  },
};

export default function PublicationsLayout({ children }) {
  return children;
}
