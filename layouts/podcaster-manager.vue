<template>
  <div class="podcaster-manager">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/podcaster-manager">
          Podcaster Dashboard
        </NuxtLink>
        <div class="navbar-nav">
          <NuxtLink class="nav-link" to="/podcaster-manager">
            <i class="ri-home-line me-2"></i>Overview
          </NuxtLink>
          <NuxtLink class="nav-link" to="/podcaster-manager/podcast">
            <i class="ri-mic-line me-2"></i>Podcasts
          </NuxtLink>
        </div>
      </div>
    </nav>
    <div class="content">
      <slot />
    </div>
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

definePageMeta({
  middleware: 'is-podcaster'
});
</script>

<style scoped>
.podcaster-manager {
  min-height: 100vh;
  background: #f8f9fa;
}

.navbar {
  padding: 1rem;
  background: #ffffff !important;
}

.content {
  padding: 2rem;
  color: #212529;
}

.nav-link {
  color: #6c757d;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: #0d6efd;
}
</style>