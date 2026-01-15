# 🚀 Portfolio de Alberto Dimande

Portfolio web profissional moderno para **Alberto Dimande**, Planificador Territorial de Maputo, Moçambique. Uma experiência imersiva que combina design cyberpunk, animações 3D, interatividade avançada e funcionalidades inovadoras.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00ffff?style=for-the-badge&logo=vercel&logoColor=black)](https://dimande.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Características Principais

### 🎨 Design & UX

- **Design Futurista**: Estilo cyberpunk com efeitos neon (cyan, magenta, azul) e glassmorphism
- **Animações Fluidas**: Transições suaves com Framer Motion e animações 3D com Three.js
- **Totalmente Responsive**: Otimizado para todos os dispositivos (mobile, tablet, desktop)
- **Cursor Personalizado**: Cursor customizado com efeitos interativos
- **Efeitos Visuais**: Partículas animadas, scanlines, grid pattern e efeitos de parallax

### 🌐 Funcionalidades Avançadas

- **Sistema Multilíngue**: Suporte completo para **Português (PT-MZ)** e **Inglês (EN-GB)**, com detecção automática e persistência.
- **ChatBot Interativo**: Assistente virtual integrado para interação com visitantes
- **Player de Áudio**: Sistema de áudio ambiente para experiência imersiva
- **Efeitos Sonoros**: Feedback sonoro em interações e navegação
- **Mapas GIS**: Visualização de mapas interativos com Leaflet
- **Timeline 3D**: Linha do tempo interativa em três dimensões
- **Dashboard de Analytics**: Estatísticas e métricas de visualização

### 🎯 Performance & SEO

- **Performance Otimizado**: Next.js 14 com App Router, `next/font` para carregamento de fontes sem blocking, e lazy loading de componentes pesados.
- **SEO Ready**: 
  - Metadata dinâmica e específica por rota.
  - Sitemap XML e Robots.txt configurados automaticamente.
  - Dados estruturados (JSON-LD) para rich snippets.
  - Verificação Google Search Console integrada.
- **Acessibilidade**: Cumpre com padrões WCAG de acessibilidade web.
- **Loading Otimizado**: Tela de carregamento com animações suaves.

---

## 🛠️ Stack Tecnológico

### Core

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18+)
- **Linguagem**: JavaScript (ES6+) / React
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)

### Bibliotecas Especializadas

- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Mapas**: [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)
- **Partículas**: [TSParticles](https://particles.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)

### Deployment

- **Plataforma**: [Vercel](https://vercel.com/) (optimizado)
- **CI/CD**: Integração automática com GitHub
- **Domínio**: [dimande.vercel.app](https://dimande.vercel.app/)

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

3. **Pronto!** O site estará online em minutos.

---

## 📁 Estrutura do Projecto

```
portifolio/
├── app/                          # App Router do Next.js 14
│   ├── layout.jsx               # Layout principal com providers e fontes
│   ├── page.jsx                 # Página inicial (Hero)
│   ├── globals.css              # Estilos globais
│   ├── not-found.jsx           # Página 404
│   ├── about/                  # Rota Sobre Mim
│   ├── experience/             # Rota Experiência
│   ├── projects/               # Rota Projectos
│   ├── publications/           # Rota Publicações
│   ├── services/               # Rota Serviços
│   └── contact/                # Rota Contacto
│
├── components/                   # Componentes React
│   ├── ... (Componentes UI, Animações, Widgets)
│
├── contexts/                    # Contextos React
│   └── LanguageContext.jsx     # Gestão de idioma (PT/EN)
│
├── lib/                         # Utilitários e dados
│   ├── data.js                 # Dados estáticos (backup)
│   ├── translations.js         # Dicionários de tradução
│   └── utils.js                # Funções utilitárias
│
├── public/                      # Arquivos estáticos
│   ├── ALD Logo.svg            # Logo
│   └── google*.html            # Verificação Google
│
├── tailwind.config.js          # Configuração de temas e cores
└── ...
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

### Atualizar Conteúdo e Traduções

- **Estrutura**: Os dados principais foram migrados para `lib/translations.js` para suportar múltiplos idiomas.
- **Edição**: Edite `lib/translations.js` para atualizar textos, projetos, experiências e publicações em ambos os idiomas (PT-MZ e EN-GB).

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

- **Email**: <alberto.dimande@outlook.com>
- **LinkedIn**: [alberto-dimande](https://linkedin.com/in/alberto-dimande)
- **Website**: [dimande.vercel.app](https://dimande.vercel.app/)

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ usando:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)

---

**Desenvolvido por Alberto Dimande** 🚀

_Planificador Territorial | Especialista em GIS | Desenvolvedor Web_
