<template>
  <header class="app-header">
    <!-- Navigation -->
    <div class="d-flex justify-content-between align-items-center h-100 px-4">
      <div class="d-flex align-items-center gap-2">
        <a href="/" class="spotify-logo d-flex align-items-center">
          <img src="/images/spotify-logo.png" alt="Spotify" height="40" />
        </a>
        
        <!-- Search bar -->
        <div class="search-container ms-3">
          <div class="input-group">
            <span class="input-group-text bg-dark border-0">
              <i class="ri-search-line text-white"></i>
            </span>
            <input 
              type="text" 
              class="form-control bg-dark border-0 text-white" 
              placeholder="Bạn muốn phát nội dung gì?"
            >
          </div>
        </div>
      </div>

      <!-- Right side controls -->
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-light rounded-pill px-4 py-2 fw-semibold" 
          @click="$router.push('/premium')"
        >
          Khám phá Premium
        </button>
        <button class="btn btn-dark rounded-pill px-3 py-2">
          <i class="ri-download-2-line me-2"></i>
          Cài đặt Ứng dụng
        </button>
        <!-- button điều hướng tới trang podcaster -->
        <button v-if="useUserStore().user.is_podcaster"  class="btn btn-dark rounded-circle p-1 "
         title="Sang trang quản lý podcast" 
        @click="$router.push('/podcaster-manager')">
          <i class="ri-mic-2-line"></i>
        </button>

        <!-- button điều hướng tới trang nghệ sĩ -->
        <button v-if="useUserStore().user.is_artist"  class="btn btn-dark rounded-circle p-1"
         title="Sang trang quản lý nghệ sĩ" 
        @click="$router.push('/artist-manager')">
          <i class="ri-music-2-line"></i>
        </button>
        <button 
          class="btn btn-dark rounded-circle p-1 d-flex align-items-center justify-content-center" 
          title="Tài khoản"
          @click="$router.push('/profile')"
        >
          <span class="user-avatar rounded-circle bg-primary d-flex align-items-center justify-content-center">
            N
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
</script>

<style scoped>


.app-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 1020;
  width: 100%;
}

.app-header > div {
  max-width: 100%;
  padding-left: 316px; /* sidebar width + padding */
}

.btn-dark {
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: #fff;
}

.btn-dark:hover {
  background-color: #282828;
}

.search-container {
  width: 364px;
}

.search-container .form-control:focus {
  box-shadow: none;
  background-color: #282828;
}

.user-avatar {
  width: 28px;
  height: 28px;
  font-weight: 500;
}

.spotify-logo img {
  height: 40px;
  width: auto;
}

.spotify-logo:hover {
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-header {
    left: 0;
  }
}
</style>