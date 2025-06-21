# 🎧 Spotify Clone Frontend – Nuxt 3

This is the **frontend** of a full-stack music streaming platform, built with **Nuxt 3**, powered by Vue 3, Pinia, Javascript, and integrated with a Django backend. 
It includes real-time interactions, Google OAuth2 authentication, multilingual support, and drag-and-drop playlist management.

> 🔗 Backend Repo: [Django + PostgreSQL + Ollama](https://github.com/nhat-khoa/spotify-clone-backend)



---

## 📽️ Video Demo

👉 Watch At: [YouTube Video Demo](https://www.youtube.com/watch?v=3gcv87uj8qc)

---
## 🚀 Key Features

- 🔐 **Google OAuth2 Authentication**  
  Login with Google using `google-one-tap` and backend verification.

- 🔑 **JWT-Based Auth**  
  Secure session handling with HttpOnly cookie and access token.

- 🧠 **AI Chatbot Integration**  
  Interact with a local chatbot (via Ollama) for song suggestions and help.

- 🌐 **i18n Multilingual Support**  
  Support for multiple languages using `vue-i18n`.

- 🎛️ **Playlist Management**  
  Create, reorder (drag-and-drop), and manage playlists with `vuedraggable`.

- 🔊 **Interactive Player**  
  Play/pause controls, seeking, volume, repeat/shuffle logic.

- 🍪 **Session & State Management**  
  Powered by `Pinia` and `js-cookie` for seamless auth + preferences sync.

---

## 🧪 Tech Stack

| Layer          | Stack                                                                 |
|----------------|-----------------------------------------------------------------------|
| **Framework**  | Nuxt 3 (Vue 3, Vite, Javascript)                                      |
| **State Mgmt** | Pinia, js-cookie                                                      |
| **UI & UX**    | Floating Vue (tooltips), Vue Toastification (notices)                |
| **Drag/Drop**  | Vuedraggable + SortableJS                                             |
| **i18n**       | vue-i18n for language translations                                    |
| **API Layer**  | Axios (integrated with Bearer/Token headers + interceptors)          |
| **Auth**       | Google One Tap + Backend JWT                                          |

---

## 🗂️ Project Structure
```
spotify-clone-nuxtjs/
├── assets/ # Custom styles, fonts, etc.
├── components/ # UI components (buttons, cards, etc.)
├── composables/ # Reusable logic (auth, fetch, state)
├── layouts/ # Nuxt layout system
├── locales/ # i18n translation files (e.g., en.json, vi.json)
├── middleware/ # Route guards (auth check, etc.)
├── pages/ # Page components (home, profile, etc.)
├── plugins/ # Third-party integrations
├── public/ # Static files (images, icons, etc.)
├── server/ # API middleware (if needed)
├── stores/ # Pinia stores (auth, player, etc.)
├── .env # Environment variables
├── app.vue # Root component
├── nuxt.config.ts # Nuxt config
├── package.json # Project dependencies
└── tsconfig.json # TypeScript config
```

---

## 📄 .env Configuration

```env
GOOGLE_CLIENT_ID=737867912492-rhok9ddk3cton3i5guo85ck0ak6p6aop.apps.googleusercontent.com
API_BASE=http://localhost:8000
```
---

## ⚙️ Getting Started

```bash
# 1. Clone the project
git clone https://github.com/nhat-khoa/spotify-clone-nuxtjs.git
cd spotify-clone-nuxtjs

# 2. Install dependencies
npm install
# or
yarn install

# 3. Create .env file in root directory
# Example:
# GOOGLE_CLIENT_ID=your_google_client_id
# API_BASE=http://localhost:8000

# 4. Run development server
npm run dev
# or
yarn dev

# App will be running at:
# http://localhost:3000
```

