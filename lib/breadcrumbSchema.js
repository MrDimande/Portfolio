const siteUrl = "https://dimande.vercel.app";

// Nomes das rotas para diferentes idiomas
const routeNames = {
  'pt-MZ': {
    about: 'Sobre Mim',
    experience: 'Experiência',
    projects: 'Projectos',
    publications: 'Publicações',
    services: 'Serviços',
    contact: 'Contacto',
  },
  en: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    publications: 'Publications',
    services: 'Services',
    contact: 'Contact',
  },
  es: {
    about: 'Sobre Mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    publications: 'Publicaciones',
    services: 'Servicios',
    contact: 'Contacto',
  },
};

/**
 * Gera o Structured Data BreadcrumbList baseado na pathname atual
 * @param {string} pathname - Pathname atual (ex: '/publications/monografia-diagnostico')
 * @param {string} language - Idioma atual ('pt-MZ', 'en', 'es')
 * @param {Object} customNames - Nomes customizados para rotas dinâmicas (ex: { 'monografia-diagnostico': 'Monografia...' })
 * @returns {Object|null} Schema.org BreadcrumbList ou null se for página inicial
 */
export function generateBreadcrumbSchema(pathname, language = 'pt-MZ', customNames = {}) {
  // Se for a página inicial, não precisa de breadcrumb
  if (pathname === '/' || !pathname) {
    return null;
  }

  // Remover query params se existirem
  const cleanPathname = pathname.split('?')[0];
  
  // Criar itens do breadcrumb
  const items = [];
  const segments = cleanPathname.split('/').filter(Boolean);
  const names = routeNames[language] || routeNames['pt-MZ'];

  // Item inicial (Home)
  items.push({
    '@type': 'ListItem',
    position: 1,
    name: language === 'en' ? 'Home' : language === 'es' ? 'Inicio' : 'Início',
    item: siteUrl,
  });

  // Adicionar cada segmento
  segments.forEach((segment, index) => {
    const position = index + 2;
    const href = `${siteUrl}/${segments.slice(0, index + 1).join('/')}`;
    
    // Tentar obter nome do dicionário, depois customNames, depois usar o segmento capitalizado
    const name = customNames[segment] || names[segment] || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      '@type': 'ListItem',
      position,
      name,
      item: href,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
