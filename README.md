# 🚀 Portfolio de Alberto Dimande

Portfolio web futurista e moderno para **Alberto Dimande**, Planificador Territorial de Maputo, Moçambique. Uma experiência imersiva que combina design cyberpunk, animações 3D, interatividade avançada e funcionalidades inovadoras.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

---

## ✨ Características Principais

### 🎨 Design & UX

- **Design Futurista**: Estilo cyberpunk com efeitos neon (cyan, magenta, azul) e glassmorphism
- **Animações Fluidas**: Transições suaves com Framer Motion e animações 3D com Three.js
- **Totalmente Responsive**: Otimizado para todos os dispositivos (mobile, tablet, desktop)
- **Cursor Personalizado**: Cursor customizado com efeitos interativos
- **Efeitos Visuais**: Partículas animadas, scanlines, grid pattern e efeitos de parallax

### 🌐 Funcionalidades Avançadas

- **Sistema Multilíngue**: Suporte para múltiplos idiomas (Português, Inglês, Espanhol)
- **ChatBot Interativo**: Assistente virtual integrado para interação com visitantes
- **Player de Áudio**: Sistema de áudio ambiente para experiência imersiva
- **Efeitos Sonoros**: Feedback sonoro em interações e navegação
- **Mapas GIS**: Visualização de mapas interativos com Leaflet
- **Timeline 3D**: Linha do tempo interativa em três dimensões
- **Dashboard de Analytics**: Estatísticas e métricas de visualização

### 🎯 Performance & SEO

- **Performance Otimizado**: Next.js 14 com App Router e otimizações automáticas
- **SEO Ready**: Metadata otimizada para motores de busca
- **Acessibilidade**: Cumpre com padrões WCAG de acessibilidade web
- **Loading Otimizado**: Tela de carregamento com animações suaves
- **Scroll Progress**: Indicador visual de progresso de rolagem

---

## 🛠️ Stack Tecnológico

### Core

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18+)
- **Linguagem**: TypeScript / JavaScript
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)

### Bibliotecas Especializadas

- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Mapas**: [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Partículas**: [TSParticles](https://particles.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)

### Deployment

- **Plataforma**: [Vercel](https://vercel.com/) (otimizado)
- **CI/CD**: Integração automática com GitHub

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Passos

1. **Clonar o repositório**

```bash
git clone <repository-url>
cd portifolio
```

2. **Instalar dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Executar em desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Abrir no navegador**

```
http://localhost:3000
```

---

## 🚢 Deployment

### Opção 1: Deploy via GitHub (Recomendado)

1. **Fazer push do código para GitHub**

   - Criar um novo repositório no GitHub
   - Fazer push de todos os arquivos do projeto

2. **Conectar com Vercel**

   - Acessar [vercel.com](https://vercel.com)
   - Fazer login com conta GitHub
   - Clicar em "Add New Project"
   - Importar o repositório do GitHub
   - Vercel detectará automaticamente Next.js
   - Clicar em "Deploy"

3. **Pronto!** O site estará online em minutos

### Opção 2: Deploy via CLI

1. **Instalar Vercel CLI**

```bash
npm i -g vercel
```

2. **Fazer login**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

4. **Deploy para produção**

```bash
vercel --prod
```

---

## 📁 Estrutura do Projeto

```
portifolio/
├── app/                          # App Router do Next.js 14
│   ├── layout.jsx               # Layout principal com providers
│   ├── page.jsx                 # Página inicial (Hero)
│   ├── globals.css              # Estilos globais
│   ├── not-found.jsx           # Página 404
│   ├── about/
│   │   └── page.jsx            # Página Sobre Mim
│   ├── experience/
│   │   └── page.jsx            # Página de Experiência Profissional
│   ├── projects/
│   │   └── page.jsx            # Página de Projetos
│   ├── publications/
│   │   └── page.jsx            # Página de Publicações
│   ├── services/
│   │   └── page.jsx            # Página de Serviços
│   └── contact/
│       └── page.jsx            # Página de Contato
│
├── components/                   # Componentes React
│   ├── Navbar.jsx              # Barra de navegação
│   ├── Footer.jsx              # Rodapé
│   ├── AnimatedText.jsx        # Texto animado
│   ├── AudioPlayer.jsx         # Player de áudio ambiente
│   ├── ChatBot.jsx             # Chatbot interativo
│   ├── CustomCursor.jsx        # Cursor personalizado
│   ├── ParticlesBackground.jsx # Fundo de partículas
│   ├── ScrollProgress.jsx      # Indicador de progresso
│   ├── ScrollToTop.jsx         # Botão voltar ao topo
│   ├── ScanLines.jsx           # Efeito scanlines
│   ├── SoundEffectsProvider.jsx # Provider de efeitos sonoros
│   ├── LanguageSelector.jsx    # Seletor de idioma
│   ├── LanguageWrapper.jsx     # Wrapper de idioma
│   ├── LoadingScreen.jsx       # Tela de carregamento
│   ├── ExperienceCard.jsx     # Card de experiência
│   ├── ProjectCard.jsx         # Card de projeto
│   ├── PublicationCard.jsx    # Card de publicação
│   ├── CompanyCard.jsx         # Card de empresa
│   ├── ContactForm.jsx         # Formulário de contato
│   ├── DownloadCV.jsx          # Download de CV
│   ├── GISMapModal.jsx         # Modal de mapas GIS
│   ├── InteractiveTimeline3D.jsx # Timeline 3D interativa
│   ├── ThreeScene.jsx          # Cena 3D
│   ├── ParallaxSection.jsx     # Seção parallax
│   ├── RevealOnScroll.jsx      # Revelação ao scroll
│   ├── GitHubStats.jsx         # Estatísticas do GitHub
│   ├── AnalyticsDashboard.jsx  # Dashboard de analytics
│   ├── CertificationsSection.jsx # Seção de certificações
│   ├── EntrepreneurshipSection.jsx # Seção de empreendedorismo
│   ├── HobbiesSection.jsx      # Seção de hobbies
│   ├── TestimonialsSection.jsx # Seção de depoimentos
│   └── CalendlyWidget.jsx      # Widget Calendly
│
├── contexts/                    # Contextos React
│   └── LanguageContext.jsx     # Contexto de idioma
│
├── lib/                         # Utilitários e dados
│   ├── data.js                 # Dados do portfolio
│   ├── translations.js         # Traduções multilíngue
│   ├── animations.js           # Utilitários de animação
│   ├── soundEffects.js         # Efeitos sonoros
│   └── utils.js                # Funções utilitárias
│
├── public/                      # Arquivos estáticos
│   ├── ALD Logo.svg           # Logo principal
│   └── README_AUDIO.md        # Documentação de áudio
│
├── package.json
├── tailwind.config.js          # Configuração Tailwind
├── next.config.js              # Configuração Next.js
├── tsconfig.json               # Configuração TypeScript
├── postcss.config.js           # Configuração PostCSS
├── vercel.json                 # Configuração Vercel
└── README.md                   # Este arquivo
```

---

## 🎨 Personalização

### Alterar Cores

Edite `tailwind.config.js` e `app/globals.css` para modificar os esquemas de cores:

```javascript
// tailwind.config.js
colors: {
  neon: {
    cyan: '#00ffff',      // Ciano neon
    magenta: '#ff00ff',   // Magenta neon
    blue: '#0080ff',      // Azul neon
  }
}
```

### Atualizar Informações Pessoais

Edite `lib/data.js` para atualizar:

- Experiências profissionais
- Projetos realizados
- Publicações
- Habilidades técnicas
- Informações de contato
- Certificações
- Depoimentos

### Adicionar Traduções

Edite `lib/translations.js` para adicionar novos idiomas ou modificar traduções existentes.

### Adicionar Imagens

1. Coloque suas imagens na pasta `public/`
2. Atualize as referências nos componentes
3. Use formatos otimizados (WebP, AVIF) para melhor performance

### Configurar ChatBot

Edite `components/ChatBot.jsx` para personalizar:

- Respostas do chatbot
- Integração com APIs de IA
- Comportamento e personalidade

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Constrói aplicação para produção
npm run start        # Inicia servidor de produção

# Qualidade
npm run lint         # Executa o linter ESLint
```

---

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto para variáveis de ambiente:

```env
# APIs Externas (opcional)
NEXT_PUBLIC_API_URL=your_api_url
EMAIL_SERVICE_API_KEY=your_api_key
CHATBOT_API_KEY=your_chatbot_key

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## 📝 Funcionalidades Detalhadas

### Sistema Multilíngue

- Suporte completo para múltiplos idiomas
- Tradução dinâmica de todo o conteúdo
- Persistência da preferência do usuário
- Seletor de idioma na navbar

### ChatBot Interativo

- Respostas inteligentes a perguntas frequentes
- Integração preparada para APIs de IA
- Interface conversacional moderna
- Histórico de conversas

### Efeitos Visuais

- **Partículas**: Fundo animado com TSParticles
- **3D Graphics**: Cenas interativas com Three.js
- **Glassmorphism**: Efeitos de vidro fosco
- **Neon Effects**: Efeitos de brilho neon
- **Parallax**: Efeitos de profundidade ao scroll

### Mapas GIS

- Visualização de mapas interativos
- Integração com Leaflet
- Modal para exibição de projetos GIS
- Suporte para múltiplos tipos de mapas

### Analytics

- Dashboard de métricas
- Estatísticas de visualização
- Integração com Google Analytics (opcional)

---

## 🚀 Performance

O projeto está otimizado para máxima performance:

- **Code Splitting**: Divisão automática de código
- **Image Optimization**: Otimização automática de imagens
- **Font Optimization**: Carregamento otimizado de fontes
- **Lazy Loading**: Carregamento sob demanda
- **Static Generation**: Geração estática quando possível

---

## 🔒 Segurança

- Validação de formulários no cliente e servidor
- Proteção contra XSS
- Sanitização de inputs
- Headers de segurança configurados

---

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contribuições

Este é um projeto pessoal, mas sugestões e melhorias são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

---

## 📄 Licença

Este projeto é de uso pessoal. Sinta-se livre para usá-lo como base para seu próprio portfolio.

---

## 📧 Contato

- **Email**: alberto.dimande@outlook.com
- **LinkedIn**: [alberto-dimande](https://linkedin.com/in/alberto-dimande)

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ usando:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- E todas as outras bibliotecas incríveis da comunidade open source!

---

**Desenvolvido por Alberto Dimande** 🚀

_Planificador Territorial Futurista | Especialista em GIS | Desenvolvedor Web_
