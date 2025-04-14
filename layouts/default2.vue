<!-- layouts/default2.vue -->
<template>
  <div class="app-container">
    <Header2 class="header-container" />
    <div class="content-wrapper">
      <SideBar2 class="sidebar-container" />
      <!-- Main Content -->
      <main class="main-content">
        <slot />
      </main>
    </div>
    <Player class="player-bar" />
  </div>
</template>

<script setup>
import SideBar2 from '~/components/SideBar2.vue';
import Header2 from '~/components/Header2.vue';
// No additional script needed for this component
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #121212;
  position: relative;
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1040;
}

.content-wrapper {
  padding-top: 1px; /* Match header height */
  display: flex;
  min-height: calc(100vh - 90px); /* Subtract player height */
}

.sidebar-container {
  position: fixed;
  top: 64px; /* Below header */
  left: 0;
  bottom: 90px; /* Above player */
  z-index: 1030;
  height: calc(100vh - 80px); /* Subtract header + player height */
}

.main-content {
  margin-left: 300px;
  padding: 20px;
  color: #fff;
  width: 100%;
  padding-bottom: 90px;
  overflow: hidden;
}

.player-bar {

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