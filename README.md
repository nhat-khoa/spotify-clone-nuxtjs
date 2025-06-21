# 🎧 Spotify Clone Frontend – Nuxt 3

This is the **frontend** of a full-stack music streaming platform, built with **Nuxt 3**, powered by Vue 3, Pinia, Javascript, and integrated with a Django backend. 
It includes real-time interactions, Google OAuth2 authentication, multilingual support, and drag-and-drop playlist management.

> 🔗 Backend Repo: [Django + PostgreSQL + Ollama](https://github.com/nhat-khoa/spotify-clone-backend)

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
| **Framework**  | Nuxt 3 (Vue 3, Vite, TypeScript)                                      |
| **State Mgmt** | Pinia, js-cookie                                                      |
| **UI & UX**    | Floating Vue (tooltips), Vue Toastification (notices)                |
| **Drag/Drop**  | Vuedraggable + SortableJS                                             |
| **i18n**       | vue-i18n for language translations                                    |
| **API Layer**  | Axios (integrated with Bearer/Token headers + interceptors)          |
| **Auth**       | Google One Tap + Backend JWT                                          |

---

## 🗂️ Project Structure

