<!-- layouts/default.vue -->
<template>
  <div class="app-container d-flex">
    <!-- Sidebar -->
    <SideBar2 class="sidebar-container" />

    <!-- Main Content -->
    <main class="main-content flex-grow-1">
      <slot />
    </main>
    <Player />

  </div>
</template>

<script setup>
import SideBar2 from '~/components/SideBar2.vue';

// No additional script needed for this component
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #121212;
  position: relative;
  padding-bottom: 90px;
  /* Height of player bar */
}

.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1030;
}

.main-content {
  margin-left: 300px;
  /* Match sidebar width */
  padding: 20px;
  color: #fff;
}

.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: #181818;
  border-top: 1px solid #282828;
  z-index: 1040;
  padding: 0 16px;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .sidebar-container {
    width: 64px;
  }

  .main-content {
    margin-left: 64px;
  }
}
</style>