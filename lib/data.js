export const experiences = [
  {
    title: 'Director-Geral',
    company: 'BMC Pro Services',
    period: '2022 - Presente',
    location: 'Maputo, Moçambique',
    description: 'Gestão estratégica, liderança de equipas e inovação empresarial. Foco em soluções profissionais de alta qualidade e desenvolvimento sustentável.',
    responsibilities: [
      'Liderança estratégica e gestão de equipas multidisciplinares',
      'Desenvolvimento e implementação de estratégias de negócio',
      'Inovação e melhoria contínua de processos',
      'Gestão de relacionamento com clientes e stakeholders',
    ],
    skills: ['Liderança', 'Gestão de equipas', 'Planeamento estratégico', 'Visão empreendedora', 'Inovação'],
    link: 'https://www.bmcpro.co.mz',
  },
  {
    title: 'Fundador & Director-Geral',
    company: 'BrainyWrite – Assessoria Académica & Criativa',
    period: '2023 - Presente',
    location: 'Maputo, Moçambique',
    description: 'Assessoria académica e criativa com foco em qualidade e inovação. Desenvolvimento de soluções educacionais e criativas personalizadas.',
    responsibilities: [
      'Fundação e desenvolvimento da empresa',
      'Gestão de projetos académicos e criativos',
      'Desenvolvimento de estratégias de conteúdo',
      'Orientação e mentoria de clientes',
    ],
    skills: ['Comunicação eficaz', 'Criatividade', 'Gestão de tempo', 'Orientação para resultados', 'Pensamento crítico'],
    link: null,
  },
  {
    title: 'Planeador Territorial',
    company: 'Municipalidade de Maputo',
    period: '2020 - Presente',
    location: 'Maputo, Moçambique',
    description: 'Desenvolvimento de planos urbanísticos estratégicos, análise territorial mediante GIS, e coordenação de projetos de desenvolvimento urbano sustentável.',
    responsibilities: [
      'Elaboração de planos mestres urbanos utilizando ArcGIS e QGIS',
      'Análise de dados geoespaciais para tomada de decisões',
      'Coordenação interdepartamental para projetos de infraestrutura',
      'Participação em consultorias de planeamento territorial',
    ],
    technologies: ['ArcGIS', 'QGIS', 'Urban Planning', 'GIS Analysis'],
  },
  {
    title: 'Desenvolvedor Web / Tradutor',
    company: 'Top Cross 1xBet',
    period: '2019 - 2021',
    location: 'Remoto',
    description: 'Desenvolvimento de interfaces web e tradução de conteúdo para plataforma de apostas desportivas, trabalhando com equipas internacionais.',
    responsibilities: [
      'Desenvolvimento front-end com tecnologias modernas',
      'Tradução e localização de conteúdo multilíngue',
      'Otimização de experiência de utilizador',
      'Colaboração com equipas de design e desenvolvimento',
    ],
    technologies: ['React', 'JavaScript', 'Web Development', 'Translation'],
  },
  {
    title: 'Consultor em Alfândegas e Tradução',
    company: 'Freelance',
    period: '2018 - 2020',
    location: 'Maputo, Moçambique',
    description: 'Serviços de consultoria em procedimentos aduaneiros e tradução profissional para empresas internacionais.',
    responsibilities: [
      'Aconselhamento em procedimentos aduaneiros',
      'Tradução de documentos técnicos e comerciais',
      'Mediação cultural e linguística',
    ],
    technologies: ['Translation', 'Consulting', 'Customs Procedures'],
  },
]

export const projects = [
  {
    title: 'Sistema de Análise Territorial GIS',
    description: 'Plataforma web interativa para visualização e análise de dados geoespaciais urbanos, integrando mapas dinâmicos e dashboards analíticos.',
    category: 'GIS / Web Development',
    type: 'gis',
    technologies: ['ArcGIS', 'QGIS', 'React', 'JavaScript', 'Leaflet'],
    liveUrl: '#',
    githubUrl: '#',
    location: {
      lat: -25.9692,
      lng: 32.5732,
      address: 'Centro de Maputo, Moçambique',
    },
  },
  {
    title: 'Dashboard de Planeamento Urbano',
    description: 'Aplicação web para monitorização e gestão de projetos urbanísticos, com visualização de métricas em tempo real e mapas interativos.',
    category: 'Urban Planning',
    type: 'gis',
    technologies: ['React', 'D3.js', 'GIS', 'Data Visualization'],
    liveUrl: '#',
    githubUrl: '#',
    location: {
      lat: -25.9603,
      lng: 32.5892,
      address: 'Área Metropolitana, Maputo',
    },
  },
  {
    title: 'Portfolio Web Pessoal',
    description: 'Sítio web portfolio moderno e futurista desenvolvido com Next.js, destacando projetos de planeamento territorial e desenvolvimento web.',
    category: 'Web Development',
    type: 'web',
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Framer Motion'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Mapa Interativo de Infraestrutura',
    description: 'Visualização geoespacial de infraestrutura urbana com camadas interativas, análise de acessibilidade e ferramentas de medição.',
    category: 'GIS',
    type: 'gis',
    technologies: ['ArcGIS Online', 'JavaScript', 'Web Mapping'],
    liveUrl: '#',
    githubUrl: '#',
    location: {
      lat: -25.9783,
      lng: 32.5751,
      address: 'Zona Portuária, Maputo',
    },
  },
  {
    title: 'Aplicação de Análise de Solos',
    description: 'Ferramenta web para análise de aptidão de solos para desenvolvimento urbano, integrando dados de sensores remotos e GIS.',
    category: 'GIS / Analysis',
    type: 'gis',
    technologies: ['QGIS', 'Python', 'Web Development', 'Remote Sensing'],
    liveUrl: '#',
    githubUrl: '#',
    location: {
      lat: -25.9517,
      lng: 32.6056,
      address: 'Distrito Urbano, Maputo',
    },
  },
  {
    title: 'Sistema de Gestão de Projetos Urbanos',
    description: 'Plataforma colaborativa para gestão de projetos de planeamento territorial, com acompanhamento de tarefas e documentação.',
    category: 'Web Development',
    type: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'GIS Integration'],
    liveUrl: '#',
    githubUrl: '#',
  },
]

export const skills = {
  gis: ['ArcGIS', 'QGIS', 'Spatial Analysis', 'Cartography', 'Remote Sensing'],
  web: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'TailwindCSS', 'Node.js'],
  planning: ['Urban Planning', 'Territorial Planning', 'Strategic Planning', 'GIS Applications'],
  languages: ['Português', 'English', 'Espanhol'],
}

export const publications = [
  {
    title: 'Planeamento Territorial Sustentável em Maputo: Desafios e Oportunidades',
    type: 'Artigo Académico',
    journal: 'Revista de Planeamento Urbano e Regional',
    year: '2023',
    authors: ['Alberto Dimande', 'Colaboradores'],
    description: 'Análise crítica dos desafios enfrentados no planeamento territorial de Maputo, com foco em sustentabilidade e desenvolvimento urbano inclusivo. O artigo explora estratégias inovadoras para gestão territorial.',
    topics: ['Planeamento Territorial', 'Sustentabilidade', 'Desenvolvimento Urbano', 'Maputo'],
    link: '#',
    pdfUrl: '#',
    citation: 'Dimande, A. (2023). Planeamento Territorial Sustentável em Maputo: Desafios e Oportunidades. Revista de Planeamento Urbano e Regional, 15(2), 45-62.',
    color: 'neon-cyan',
  },
  {
    title: 'Integração de GIS e Web Technologies para Visualização de Dados Territoriais',
    type: 'Paper Técnico',
    journal: 'Conferência Internacional de Tecnologias Geoespaciais',
    year: '2022',
    authors: ['Alberto Dimande'],
    description: 'Exploração de metodologias para integração de sistemas GIS tradicionais com tecnologias web modernas, criando plataformas interativas para visualização e análise de dados territoriais.',
    topics: ['GIS', 'Web Development', 'Data Visualization', 'Tecnologia'],
    link: '#',
    pdfUrl: '#',
    citation: 'Dimande, A. (2022). Integração de GIS e Web Technologies para Visualização de Dados Territoriais. In Proceedings of the International Conference on Geospatial Technologies (pp. 123-138).',
    color: 'neon-magenta',
  },
  {
    title: 'Análise Espacial de Acessibilidade Urbana: Caso de Estudo em Maputo',
    type: 'Artigo de Pesquisa',
    journal: 'Journal of Urban Planning and Development',
    year: '2021',
    authors: ['Alberto Dimande', 'Equipa de Pesquisa'],
    description: 'Estudo detalhado sobre acessibilidade urbana em diferentes zonas de Maputo, utilizando análise espacial avançada e ferramentas GIS para identificar áreas prioritárias de intervenção.',
    topics: ['Acessibilidade Urbana', 'Análise Espacial', 'GIS', 'Pesquisa'],
    link: '#',
    pdfUrl: '#',
    citation: 'Dimande, A., et al. (2021). Análise Espacial de Acessibilidade Urbana: Caso de Estudo em Maputo. Journal of Urban Planning and Development, 8(3), 78-95.',
    color: 'neon-blue',
  },
  {
    title: 'O Papel da Tecnologia no Planeamento Participativo',
    type: 'Post / Artigo de Opinião',
    journal: 'Blog de Planeamento Territorial',
    year: '2023',
    authors: ['Alberto Dimande'],
    description: 'Reflexão sobre como as tecnologias digitais podem democratizar o processo de planeamento territorial, tornando-o mais acessível e participativo para comunidades locais.',
    topics: ['Planeamento Participativo', 'Tecnologia', 'Democracia Digital', 'Inovação'],
    link: '#',
    pdfUrl: null,
    citation: 'Dimande, A. (2023, Junho). O Papel da Tecnologia no Planeamento Participativo. Blog de Planeamento Territorial.',
    color: 'neon-cyan',
  },
  {
    title: 'Metodologias de Análise de Uso do Solo com QGIS',
    type: 'Tutorial / Guia Técnico',
    journal: 'GIS Professional Magazine',
    year: '2022',
    authors: ['Alberto Dimande'],
    description: 'Guia prático sobre metodologias de análise de uso do solo utilizando QGIS, incluindo workflows, scripts e melhores práticas para profissionais de planeamento territorial.',
    topics: ['QGIS', 'Análise de Uso do Solo', 'Metodologia', 'Tutorial'],
    link: '#',
    pdfUrl: '#',
    citation: 'Dimande, A. (2022). Metodologias de Análise de Uso do Solo com QGIS. GIS Professional Magazine, 24(4), 32-48.',
    color: 'neon-magenta',
  },
  {
    title: 'Desenvolvimento Urbano Sustentável: Perspectivas para Moçambique',
    type: 'Artigo Académico',
    journal: 'Revista Africana de Planeamento e Desenvolvimento',
    year: '2021',
    authors: ['Alberto Dimande', 'Colaboradores'],
    description: 'Análise das perspectivas de desenvolvimento urbano sustentável em Moçambique, com ênfase em políticas públicas, práticas inovadoras e desafios regionais.',
    topics: ['Desenvolvimento Sustentável', 'Moçambique', 'Políticas Públicas', 'Urbanismo'],
    link: '#',
    pdfUrl: '#',
    citation: 'Dimande, A., et al. (2021). Desenvolvimento Urbano Sustentável: Perspectivas para Moçambique. Revista Africana de Planeamento e Desenvolvimento, 12(1), 15-32.',
    color: 'neon-blue',
  },
]

export const aboutContent = {
  intro: `Soy Alberto Dimande, un Planificador Territorial Futurista con sede en Maputo, Mozambique.
    Mi pasión radica en fusionar la planificación urbana tradicional con tecnologías modernas de
    información geográfica y desarrollo web para crear soluciones innovadoras que transformen
    nuestras ciudades.`,

  background: `Con una sólida formación en planificación territorial y años de experiencia en
    análisis GIS, he trabajado en proyectos que van desde planes maestros urbanos hasta
    aplicaciones web interactivas para visualización de datos geoespaciales. Mi experiencia
    en desarrollo web me permite crear herramientas personalizadas que mejoran la eficiencia
    y accesibilidad de la información territorial.`,

  approach: `Mi enfoque combina el rigor analítico del urbanismo con la creatividad del desarrollo
    web moderno. Utilizo tecnologías como ArcGIS y QGIS para análisis espacial profundo, mientras
    desarrollo interfaces web intuitivas que hacen que los datos complejos sean accesibles para
    todos los stakeholders.`,

  vision: `Creo en un futuro donde la planificación territorial sea más participativa,
    transparente y basada en datos. Mi objetivo es continuar desarrollando herramientas
    que empoderen a las comunidades y a los planificadores para tomar decisiones más
    informadas sobre el futuro de nuestras ciudades.`,
}

export const testimonials = [
  {
    name: 'Dr. Maria Santos',
    role: 'Diretora de Planeamento Urbano',
    company: 'Municipalidade de Maputo',
    content: 'Alberto demonstrou excelência técnica e visão estratégica em todos os projetos de planeamento territorial. Sua capacidade de integrar tecnologias GIS com soluções web modernas trouxe resultados excepcionais para nossa equipe.',
    rating: 5,
    color: 'neon-cyan',
  },
  {
    name: 'Eng. João Silva',
    role: 'CEO',
    company: 'TechSolutions Lda',
    content: 'Trabalhar com Alberto foi uma experiência transformadora. Sua expertise em desenvolvimento web e análise GIS nos ajudou a criar plataformas inovadoras que revolucionaram nossa forma de visualizar dados territoriais.',
    rating: 5,
    color: 'neon-magenta',
  },
  {
    name: 'Prof. Ana Costa',
    role: 'Investigadora',
    company: 'Universidade Eduardo Mondlane',
    content: 'Alberto é um profissional excepcional que combina conhecimento técnico profundo com criatividade. Suas contribuições para nossos projetos de pesquisa em planeamento urbano foram fundamentais.',
    rating: 5,
    color: 'neon-blue',
  },
  {
    name: 'Carlos Mendes',
    role: 'Diretor de Projetos',
    company: 'Urban Development Group',
    content: 'A capacidade de Alberto de traduzir dados complexos em visualizações intuitivas é impressionante. Seu trabalho em dashboards interativos elevou significativamente a qualidade de nossos relatórios.',
    rating: 5,
    color: 'neon-cyan',
  },
  {
    name: 'Sofia Rodrigues',
    role: 'Consultora Internacional',
    company: 'Global Planning Solutions',
    content: 'Alberto possui uma visão única que integra planeamento territorial tradicional com tecnologias modernas. Seu trabalho em projetos de desenvolvimento urbano sustentável é exemplar.',
    rating: 5,
    color: 'neon-magenta',
  },
]

