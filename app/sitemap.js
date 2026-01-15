import { publications } from '@/lib/data';

export default function sitemap() {
  const baseUrl = "https://dimande.vercel.app";
  const now = new Date();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          'pt-MZ': baseUrl,
          'en': `${baseUrl}?lang=en`,
          'es': `${baseUrl}?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/about`,
          'en': `${baseUrl}/about?lang=en`,
          'es': `${baseUrl}/about?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/experience`,
          'en': `${baseUrl}/experience?lang=en`,
          'es': `${baseUrl}/experience?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/projects`,
          'en': `${baseUrl}/projects?lang=en`,
          'es': `${baseUrl}/projects?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/publications`,
          'en': `${baseUrl}/publications?lang=en`,
          'es': `${baseUrl}/publications?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/services`,
          'en': `${baseUrl}/services?lang=en`,
          'es': `${baseUrl}/services?lang=es`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: {
          'pt-MZ': `${baseUrl}/contact`,
          'en': `${baseUrl}/contact?lang=en`,
          'es': `${baseUrl}/contact?lang=es`,
        },
      },
    },
  ];

  // Adicionar URLs dinâmicas de publicações individuais
  const publicationRoutes = publications.map((publication) => ({
    url: `${baseUrl}/publications/${publication.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: {
      languages: {
        'pt-MZ': `${baseUrl}/publications/${publication.slug}`,
        'en': `${baseUrl}/publications/${publication.slug}?lang=en`,
        'es': `${baseUrl}/publications/${publication.slug}?lang=es`,
      },
    },
  }));

  return [...staticRoutes, ...publicationRoutes];
}
