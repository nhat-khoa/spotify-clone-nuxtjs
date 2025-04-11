<!-- components/SideBarLibraryItem.vue -->
<template>
  <div 
    class="library-item d-flex align-items-center p-2 rounded-2" 
    :class="{ 'ms-3': isInFolder }"
    @click="navigateToItem"
  >
    <div class="library-item-image me-3">
      <img 
        :src="image || defaultImage" 
        :alt="title" 
        class="rounded" 
        :class="{ 
          'rounded-circle': type === 'artist',
          'rounded-1': type === 'folder'
        }"
        width="40" 
        height="40"
      >
    </div>
    <div class="library-item-info flex-grow-1">
      <div class="library-item-title text-truncate">{{ title }}</div>
      <div class="library-item-meta d-flex align-items-center gap-2">
        <i v-if="type === 'artist'" class="ri-verified-badge-fill text-primary small"></i>
        <i v-if="type === 'folder'" class="ri-folder-fill text-primary small"></i>
        <span class="library-item-subtitle text-white-50 small text-truncate">{{ subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'playlist',
    validator: (value) => ['playlist', 'artist', 'album', 'folder'].includes(value)
  },
  isInFolder: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const defaultImage = computed(() => {
  switch (props.type) {
    case 'playlist':
      return '/default-playlist.jpg';
    case 'artist':
      return '/default-artist.jpg';
    case 'album':
      return '/default-album.jpg';
    case 'folder':
      return '/folder-icon.png';
    default:
      return '/default-playlist.jpg';
  }
});

const navigateToItem = () => {
  if (props.path) {
    router.push(props.path);
  }
};
</script>

<style scoped>
.library-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 48px;
}

.library-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.library-item-image {
  flex-shrink: 0;
}

.library-item-image img {
  object-fit: cover;
  width: 40px;
  height: 40px;
}

.library-item-title {
  font-weight: 500;
  font-size: 0.875rem;
}

.library-item-subtitle {
  font-size: 0.75rem;
}

.library-item-meta {
  line-height: 1.2;
}
</style>