# Obaatanpa - New Frontend

A modern, comprehensive maternity care platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Beautiful UI**: Tailwind CSS with custom design system
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in dark/light theme support
- **Animations**: Smooth animations with Framer Motion and AOS
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized for speed and SEO

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
obaa-new-frontend/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── ...config files
```

## 🎨 Design System

The project uses a custom design system based on the original Obaatanpa branding:

- **Primary Colors**: Pink/Rose tones (#e67d82)
- **Secondary Colors**: Blue tones for accents
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, accessible components

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Export a default React component

### Adding Components

1. Create component in `src/components/`
2. Use TypeScript for type safety
3. Follow the existing naming conventions

## 📱 Responsive Design

The application is built mobile-first with breakpoints:

- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

## 🌙 Dark Mode

Dark mode is implemented using Tailwind's dark mode feature with class-based toggling.

## 🚀 Deployment

The application can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any platform supporting Node.js

## 📄 License

This project is proprietary and confidential.
