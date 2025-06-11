// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      allowedHosts: [
        "glorious-boxer-honestly.ngrok-free.app"
      ]
    },
  },
  app: {
    head: {
      // Script inline pour appliquer le dark mode immédiatement
      script: [
        {
          innerHTML: `
            (function() {
              // Fonction pour appliquer le dark mode immédiatement
              function applyInitialTheme() {
                try {
                  const storedTheme = localStorage.getItem('darkMode');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  // Déterminer le thème à appliquer (même logique que le composable)
                  let shouldUseDark;
                  if (storedTheme !== null) {
                    shouldUseDark = storedTheme === 'true';
                  } else {
                    shouldUseDark = systemPrefersDark;
                  }

                  // Appliquer immédiatement les classes
                  const html = document.documentElement;
                  const body = document.body;

                  if (shouldUseDark) {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                    body.style.backgroundColor = '#111827'; // gray-900
                  } else {
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                    body.style.backgroundColor = '#fef7ed'; // orange-50
                  }

                  // Stocker l'état pour que Vue puisse le récupérer
                  window.__INITIAL_DARK_MODE__ = shouldUseDark;

                } catch (error) {
                  // En cas d'erreur, appliquer le dark mode par défaut
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.body.style.backgroundColor = '#111827';
                  window.__INITIAL_DARK_MODE__ = true;
                }
              }

              // Appliquer le thème dès que possible
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyInitialTheme);
              } else {
                applyInitialTheme();
              }
            })();
          `,
          type: 'text/javascript'
        }
      ],
      // Meta tags pour éviter le flash
      meta: [
        {
          name: 'color-scheme',
          content: 'dark light'
        }
      ]
    }
  },
  runtimeConfig: {
    // Private keys
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    public: {
      emailUser: process.env.EMAIL_USER,
    }
  },
  modules: ['shadcn-nuxt', '@nuxtjs/ngrok', '@nuxt/icon', 'nuxt-nodemailer'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  ngrok: {
    authtoken_from_env: true,
    domain: 'glorious-boxer-honestly.ngrok-free.app'
  },
  nodemailer: {
    from: process.env.EMAIL_USER,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  },
})
