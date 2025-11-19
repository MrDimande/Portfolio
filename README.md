# Portfolio de Alberto Dimande

Portfolio web personal futurista y moderno para Alberto Dimande, Planificador Territorial Futurista de Maputo, Mozambique.

## 🚀 Características

- **Diseño Futurista**: Estilo cyberpunk con efectos neon (cyan, magenta, azul) y glassmorphism
- **Animaciones Suaves**: Transiciones fluidas con Framer Motion
- **Totalmente Responsive**: Optimizado para todos los dispositivos
- **Performance Optimizado**: Next.js 14 con App Router
- **SEO Ready**: Metadata optimizada para motores de búsqueda
- **Accesible**: Cumple con estándares de accesibilidad web

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14 (React 18+)
- **Estilos**: TailwindCSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Deployment**: Vercel (optimizado)

## 📦 Instalación

1. **Clonar el repositorio** (o descargar los archivos)

```bash
git clone <repository-url>
cd portifolio
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**

Navega a [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   - Crea un nuevo repositorio en GitHub
   - Sube todos los archivos del proyecto

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js
   - Haz clic en "Deploy"

3. **¡Listo!** Tu sitio estará en línea en minutos

### Opción 2: Deploy desde CLI

1. **Instala Vercel CLI**

```bash
npm i -g vercel
```

2. **Inicia sesión**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

4. **Deploy a producción**

```bash
vercel --prod
```

## 📁 Estructura del Proyecto

```
portifolio/
├── app/
│   ├── layout.jsx          # Layout principal
│   ├── page.jsx            # Página de inicio (Hero)
│   ├── about/
│   │   └── page.jsx        # Página Sobre Mí
│   ├── experience/
│   │   └── page.jsx        # Página de Experiencia
│   ├── projects/
│   │   └── page.jsx        # Página de Proyectos
│   ├── contact/
│   │   └── page.jsx        # Página de Contacto
│   └── globals.css         # Estilos globales
├── components/
│   ├── Navbar.jsx          # Barra de navegación
│   ├── Footer.jsx          # Pie de página
│   ├── AnimatedText.jsx    # Componente de texto animado
│   ├── ExperienceCard.jsx  # Tarjeta de experiencia
│   ├── ProjectCard.jsx     # Tarjeta de proyecto
│   └── ContactForm.jsx    # Formulario de contacto
├── lib/
│   ├── data.js            # Datos del portfolio
│   └── animations.js      # Utilidades de animación
├── public/                # Archivos estáticos
│   └── (añade tus imágenes aquí)
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js` y `app/globals.css` para modificar los colores neon:

```javascript
// tailwind.config.js
colors: {
  neon: {
    cyan: '#00ffff',      // Cambia estos valores
    magenta: '#ff00ff',
    blue: '#0080ff',
  }
}
```

### Actualizar Información Personal

Edita `lib/data.js` para actualizar:
- Experiencias profesionales
- Proyectos
- Habilidades
- Información de contacto

### Añadir Imágenes

1. Coloca tus imágenes en la carpeta `public/`
2. Actualiza las referencias en los componentes

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📝 Notas Importantes

- **Formulario de Contacto**: Actualmente el formulario simula el envío. Para funcionalidad real, integra un servicio como:
  - Formspree
  - EmailJS
  - API Route de Next.js con SendGrid/Resend
  - Vercel Serverless Functions

- **Imágenes**: Añade tus propias imágenes en la carpeta `public/`:
  - `profile.jpg` - Foto de perfil
  - `city-lights-bg.webp` - Imagen de fondo (opcional)
  - `favicon.ico` - Favicon del sitio

- **Enlaces**: Actualiza los enlaces de LinkedIn y email en:
  - `components/Footer.jsx`
  - `components/ContactForm.jsx`
  - `lib/data.js`

## 🌐 Variables de Entorno (Opcional)

Si necesitas variables de entorno (por ejemplo, para APIs), crea un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_url
EMAIL_SERVICE_API_KEY=your_api_key
```

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de usarlo como base para tu propio portfolio.

## 🤝 Contribuciones

Este es un proyecto personal, pero las sugerencias y mejoras son bienvenidas.

## 📧 Contacto

- **Email**: alberto.dimande@outlook.com
- **LinkedIn**: [alberto-dimande](https://linkedin.com/in/alberto-dimande)

---

Desarrollado con ❤️ usando Next.js y TailwindCSS

