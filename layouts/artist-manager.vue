<template>
  <div class="artist-manager-layout">
    <!-- Navigation Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand fw-bold" to="/artist-manager">
          <i class="ri-music-fill text-primary me-2"></i>Artist Manager
        </NuxtLink>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#artistManagerNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="artistManagerNav">
          <ul class="navbar-nav me-auto">

            <li class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ active: $route.path.includes('/artist-manager/track') }"
                to="/artist-manager/track"
              >
                <i class="ri-music-2-line me-1"></i>Tracks
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ active: $route.path.includes('/artist-manager/album') }"
                to="/artist-manager/album"
              >
                <i class="ri-album-line me-1"></i>Albums
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ active: $route.path.includes('/artist-manager/gallery') }"
                to="/artist-manager/gallery"
              >
                <i class="ri-image-line me-1"></i>Gallery
              </NuxtLink>
            </li>
          </ul>
          
          <!-- User Menu -->
          <div class="dropdown">
            <button class="btn btn-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
              <img :src="userStore.user?.avatar_url || userStore.user?.avatar_google_url || '/default-avatar.png'" 
                   class="rounded-circle me-2" 
                   width="32" 
                   height="32"
                   alt="User avatar">
              <span>{{ userStore.user?.name }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <NuxtLink class="dropdown-item" to="/settings">
                  <i class="ri-settings-3-line me-2"></i>Settings
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                  <i class="ri-logout-box-line me-2"></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="content-wrapper">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const { $axios } = useNuxtApp();

const logout = async () => {
  try {
    await $axios.post('/api/auth/logout');
    await navigateTo('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
.artist-manager-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  padding: 0.75rem 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  color: #495057;
  border-radius: 4px;
  margin: 0 0.25rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #212529;
}

.nav-link.active {
  background-color: #0d6efd;
  color: white !important;
}

.content-wrapper {
  padding: 2rem;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
}

.dropdown-item i {
  width: 1.25rem;
}
</style>