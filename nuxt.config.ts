// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      apiBase: process.env.API_BASE,
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  plugins: [
  ],

  css: [
    "~/assets/css/plugins.bundle.css",
    "~/assets/css/styles.bundle.css",
    "vue-toastification/dist/index.css",
    // "bootstrap/dist/css/bootstrap.css",
    // "bootstrap-icons/font/bootstrap-icons.css",
    // 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
  ],

  modules: ["@pinia/nuxt",],

  app: {
    baseURL: "/",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css",
        },
      ],
      script: [
        {
          src: "/js/plugins.bundle.js",
          tagPosition: "bodyClose",
        },
        {
          src: "/js/scripts.bundle.js",
          tagPosition: "bodyClose",
        },
        {
          src: "https://accounts.google.com/gsi/client",
          async: true,
          defer: true,
        },
        // {
        //   src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
        // },
      ],
    },
  },
});

// npm uninstall bootstrap-vue-3