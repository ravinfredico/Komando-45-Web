# Komando'45 Website

Modern website for Komando'45 built with **Next.js 16**, **React**, **GSAP** animations, and **Tailwind CSS**. Features smooth scrolling effects, responsive design, and optimized performance.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **GSAP** - Professional-grade animation library with ScrollTrigger
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with GSAP scroll animations
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── thank-you/         # Thank you page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles and theme
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation component
│   └── Preloader.tsx     # GSAP-powered preloader
├── public/               # Static assets
│   ├── images/          # Images and logos
│   ├── css/             # Legacy CSS files
│   └── js/              # Legacy JavaScript
├── templates/           # Legacy Flask HTML templates (preserved)
└── static/              # Legacy static files (preserved)
```

## Features

- ✨ **GSAP Scroll Animations** - Smooth parallax effects and scroll-triggered animations
- 🎨 **Modern Design** - Dark theme with gold accents
- 📱 **Fully Responsive** - Works on all device sizes
- ⚡ **Fast Performance** - Optimized with Next.js static generation
- 🎭 **Preloader Animation** - GSAP-powered entrance animation
- 📝 **Contact Form** - Integrated with Formspree

## Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Docker

Build and run with Docker:

```bash
docker build -t komando45 .
docker run -p 3000:3000 komando45
```

## GSAP Animations

The website uses GSAP (GreenSock Animation Platform) for professional animations:

- **Preloader** - Animated entrance with logo reveal
- **Hero Section** - Fade-in animation on page load
- **Scroll Animations** - Elements animate in as you scroll
- **Parallax Effects** - Subtle depth with scroll-based movement
- **Smooth Transitions** - Page navigation and interactions

All animations are optimized for performance and accessibility.

## Contact Form

The contact form submits to Formspree at `https://formspree.io/f/mvglzogr`. To use your own endpoint:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update the `action` URL in `app/contact/page.tsx`

## Customization

### Theme Colors

Edit theme colors in `tailwind.config.js`:

```js
colors: {
  'primary': '#6d1a1a',
  'primary-dark': '#a02c2c',
  'gold': '#e6c177',
  // ... more colors
}
```

### Animations

Modify GSAP animations in component files:
- `components/Preloader.tsx` - Preloader animation
- `app/page.tsx` - Home page scroll animations
- `app/about/page.tsx` - About page animations

## Legacy Flask Files

The repository includes legacy Flask files (`app.py`, `templates/`, `static/`) for reference. These are no longer used in the Next.js version but are preserved for historical purposes.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Documentation](https://react.dev) - learn about React
- [GSAP Documentation](https://greensock.com/docs/) - learn about GSAP animations
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Komando'45 - All rights reserved

## Contact

- Website: [komando45.com](https://komando45.com)
- Email: info@komando45.com
- Location: Taylor's University, Subang Jaya, Malaysia

