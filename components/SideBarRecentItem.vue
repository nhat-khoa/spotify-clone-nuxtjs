<!-- components/SideBarRecentItem.vue -->
<template>
  <div class="recent-item d-flex align-items-center p-2 rounded mb-2" @click="navigateToItem">
    <div class="recent-item-image me-3">
      <img :src="image || '/default-playlist.jpg'" :alt="title" class="rounded" width="40" height="40">
    </div>
    <div class="recent-item-title text-truncate">{{ title }}</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: null
  }
});

const router = useRouter();

const navigateToItem = () => {
  if (props.path) {
    router.push(props.path);
  }
};
</script>

<style scoped>
.recent-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.recent-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.recent-item-image img {
  object-fit: cover;
}

.recent-item-title {
  font-weight: 500;
  max-width: 170px;
}
</style>