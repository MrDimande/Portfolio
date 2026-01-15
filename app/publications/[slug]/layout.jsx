import StructuredData from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbSchema';
import { publications } from '@/lib/data';

const siteUrl = "https://dimande.vercel.app";

export async function generateMetadata({ params }) {
  const publication = publications.find((p) => p.slug === params.slug);

  if (!publication) {
    return {
      title: 'Publicação não encontrada | Alberto Dimande',
      description: 'A publicação solicitada não foi encontrada.',
    };
  }

  const title = `${publication.title} | Alberto Dimande`;
  const description = publication.description || `${publication.type} por Alberto Dimande sobre ${publication.topics?.[0] || 'planeamento territorial'}.`;
  const imageUrl = `${siteUrl}/profile.JPG`;

  return {
    title,
    description,
    keywords: [
      ...(publication.topics || []),
      publication.type,
      'Alberto Dimande',
      'Planeamento Territorial',
      'GIS',
      publication.journal,
      publication.year,
    ],
    authors: publication.authors?.map((author) => ({
      name: author,
      url: siteUrl,
    })),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/publications/${publication.slug}`,
      siteName: 'Alberto Dimande Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: publication.title,
        },
      ],
      locale: 'pt_MZ',
      type: 'article',
      publishedTime: publication.year ? `${publication.year}-01-01` : undefined,
      authors: publication.authors,
      section: publication.type,
      tags: publication.topics || [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@mr.dimande',
    },
    alternates: {
      canonical: `${siteUrl}/publications/${publication.slug}`,
      languages: {
        'pt-MZ': `${siteUrl}/publications/${publication.slug}`,
        'en': `${siteUrl}/publications/${publication.slug}?lang=en`,
        'es': `${siteUrl}/publications/${publication.slug}?lang=es`,
      },
    },
  };
}

export default function PublicationLayout({ children, params }) {
  const publication = publications.find((p) => p.slug === params.slug);

  if (!publication) {
    return children;
  }

  const pathname = `/publications/${publication.slug}`;

  // Structured Data - Schema.org Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: publication.title,
    description: publication.description,
    image: `${siteUrl}/profile.JPG`,
    datePublished: publication.year ? `${publication.year}-01-01` : undefined,
    dateModified: publication.year ? `${publication.year}-01-01` : undefined,
    author: {
      '@type': 'Person',
      name: publication.authors?.[0] || 'Alberto Dimande',
      url: siteUrl,
      sameAs: [
        'https://github.com/MrDimande',
        'https://www.linkedin.com/in/alberto-dimande-97817822b/',
        'https://instagram.com/mr.dimande',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Alberto Dimande',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/publications/${publication.slug}`,
    },
    articleSection: publication.type,
    keywords: publication.topics?.join(', ') || '',
    inLanguage: 'pt-MZ',
    copyrightHolder: {
      '@type': 'Person',
      name: publication.authors?.[0] || 'Alberto Dimande',
    },
    copyrightYear: publication.year,
    ...(publication.journal && {
      publisher: {
        '@type': 'Organization',
        name: publication.journal,
      },
    }),
  };

  // Structured Data - BreadcrumbList (server-side para garantir disponibilidade)
  const breadcrumbSchema = generateBreadcrumbSchema(pathname, 'pt-MZ', {
    [publication.slug]: publication.title,
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}
      {children}
    </>
  );
}
