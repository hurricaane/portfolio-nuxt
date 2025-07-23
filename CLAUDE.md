# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Prepare Nuxt (after dependency changes)
npm run postinstall
```

## Project Architecture

This is a **Nuxt 3** portfolio website with TypeScript, TailwindCSS v4, and Shadcn-vue components.

### Key Structure
- **Single-page application**: Uses `pages/index.vue` as the main page
- **Component-based architecture**: Section components (Hero, About, Skills, Projects, Contact) imported into the main page
- **Shadcn-vue UI system**: Components in `components/ui/` with configuration in `components.json`
- **Composables**: `composables/` contains reusable logic (useDarkMode, useLoading, useToast)
- **Email functionality**: Uses nuxt-nodemailer with Gmail SMTP for contact form

### Critical Configuration Files
- `nuxt.config.ts`: Main configuration with email setup, ngrok tunnel, and dark mode script injection
- `components.json`: Shadcn-vue configuration with aliases and styling
- `.env`: Required environment variables (EMAIL_USER, EMAIL_PASSWORD)

### Dark Mode Implementation
- Custom dark mode with system preference detection
- Inline script in nuxt.config.ts prevents FOUC (Flash of Unstyled Content)
- Uses `useDarkMode.ts` composable for state management
- Applied via Tailwind's `dark:` classes

### Email System
- Contact form sends emails via Gmail SMTP
- Requires EMAIL_USER and EMAIL_PASSWORD environment variables
- Server API endpoint handles form submissions

### Development Notes
- Uses ngrok for external access during development (configured domain)
- TailwindCSS v4 with @tailwindcss/vite plugin
- Responsive design with mobile-first approach
- Animation library: tw-animate-css for smooth transitions

### Claude Operational Guidelines
- IMPORTANT! Always use context7 to look up for documentation if necessary before doing any task