<template>
  <li class="nav-item">
    <NuxtLink 
      :to="path" 
      class="nav-link d-flex align-items-center p-2 text-white text-decoration-none rounded-2"
      :class="{ active: isActive }"
    >
      <i :class="[icon, 'fs-5 me-3']"></i>
      <span class="fw-medium">{{ label }}</span>
    </NuxtLink>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const route = useRoute();
const isActive = computed(() => route.path === props.path);
</script>

<style scoped>
.nav-link {
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #fff !important;
}

.nav-link.active {
  color: #fff !important;
}

.nav-link:not(.active) {
  color: #b3b3b3 !important;
}

.nav-link:hover:not(.active) {
  color: #fff !important;
}
</style>