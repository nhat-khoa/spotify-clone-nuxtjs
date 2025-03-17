// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/plugins.bundle.css", "~/assets/css/styles.bundle.css"],
  app: {
    baseURL: "/",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
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
      ],
    },
  },
});
