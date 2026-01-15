'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import StructuredData from '@/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/breadcrumbSchema';
import { publications } from '@/lib/data';

/**
 * Componente que gera e renderiza Structured Data BreadcrumbList
 * Dinâmico baseado na rota atual
 */
export default function BreadcrumbStructuredData() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [breadcrumbSchema, setBreadcrumbSchema] = useState(null);

  useEffect(() => {
    // Se for a página inicial, não renderiza breadcrumb
    if (pathname === '/' || !pathname) {
      setBreadcrumbSchema(null);
      return;
    }

    // Verificar se é uma página de publicação dinâmica para obter o nome correto
    const segments = pathname.split('/').filter(Boolean);
    const customNames = {};

    // Se for uma publicação dinâmica, obter o título da publicação
    if (segments[0] === 'publications' && segments[1]) {
      const publication = publications.find((p) => p.slug === segments[1]);
      if (publication) {
        customNames[segments[1]] = publication.title;
      }
    }

    // Gerar schema do breadcrumb
    const schema = generateBreadcrumbSchema(pathname, language, customNames);
    setBreadcrumbSchema(schema);
  }, [pathname, language]);

  // Não renderizar se não houver schema (página inicial)
  if (!breadcrumbSchema) {
    return null;
  }

  return <StructuredData data={breadcrumbSchema} />;
}
