<template>
  <div class="saved-episodes-page">
    <!-- Header -->
    <div class="page-header position-relative mb-4">
      <div class="gradient-background"></div>
      <div class="header-content d-flex gap-4 p-4">
        <div class="header-cover shadow d-flex align-items-center justify-content-center bg-success">
          <i class="ri-podcast-fill text-white display-1"></i>
        </div>
        <div class="header-info d-flex flex-column justify-content-end">
            <span class="header-type text-uppercase mb-2">Podcast</span>
            <h1 class="header-title mb-3">Tập đã lưu</h1>
          <div class="header-meta d-flex align-items-center flex-wrap gap-2">
            <img 
              :src="userStore.user?.avatar_google_url || userStore.user?.avatar_url || '/images/default-avatar.png'"
              class="rounded-circle"
              width="24"
              height="24"
              :alt="userStore.user?.full_name"
            />
            <span class="user-name">{{ userStore.user?.full_name }}</span>
            <span class="bullet">•</span>
            <span class="episode-count">{{ savedEpisodes.length }} tập</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="page-controls d-flex align-items-center gap-4 mb-4 px-4">
      <button 
        class="btn-play d-flex align-items-center justify-content-center"
        @click="playEpisode(savedEpisodes[0], 0)" 
        v-if="savedEpisodes.length"
      >
        <i class="ri-play-fill fs-3"></i>
      </button>
    </div>

    <!-- Episodes List -->
    <div class="episodes-list px-4">
      <!-- Header -->
      <div class="episodes-header d-flex align-items-center text-secondary small border-bottom border-secondary py-2 px-3">
        <div class="col-1 text-center">#</div>
        <div class="col">Tiêu đề</div>
        <div class="col-md-3 d-none d-md-block">Podcast</div>
        <div class="col-md-2 d-none d-md-block">Ngày thêm</div>
        <div class="col-auto">
          <i class="ri-time-line"></i>
        </div>
      </div>

      <!-- Episode Items -->
      <div class="episodes-body">
        <div 
          v-for="(episode, index) in savedEpisodes" 
          :key="episode.id"
          class="episode-item d-flex align-items-center py-3 px-3 rounded position-relative"
          @dblclick="playEpisode(episode, index)"
        >
          <div class="col-1 text-center text-secondary">{{ index + 1 }}</div>
          <div class="col d-flex align-items-center">
            <img
              :src="episode.cover_art_image_url || episode.podcast?.cover_art_image_url || '/images/default-podcast.png'"
              class="episode-cover rounded me-3"
              width="40"
              height="40"
              :alt="episode.title"
            />
            <div>
              <div class="episode-title text-white">{{ episode.title }}</div>
              <div class="episode-description text-secondary small text-truncate" style="max-width: 400px;">
                {{ episode.description }}
              </div>
            </div>
          </div>
          <div 
            class="col-md-3 d-none d-md-block text-secondary text-truncate cursor-pointer"
            @click="navigateTo(`/podcast/${episode.podcast?.id}`)"
          >
            {{ episode.podcast?.title }}
          </div>
          <div class="col-md-2 d-none d-md-block text-secondary">
            {{ formatDate(episode.created_at) }}
          </div>
          <div class="col-auto text-secondary me-3">
            {{ formatDuration(episode.duration_ms) }}
          </div>

          <!-- Dropdown Menu -->
          <div class="dropdown">
            <button
              class="btn text-secondary p-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="ri-more-fill fs-5"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="addToQueue(episode)"
                >
                  <i class="ri-add-line"></i>
                  <span>Thêm vào hàng đợi</span>
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="removeFromSaved(episode)"
                >
                  <i class="ri-heart-fill text-success"></i>
                  <span>Xóa khỏi danh sách đã lưu</span>
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="navigateTo(`/podcast/${episode.podcast?.id}`)"
                >
                  <i class="ri-radio-line"></i>
                  <span>Xem podcast</span>
                </button>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="shareEpisode(episode)"
                >
                  <i class="ri-share-line"></i>
                  <span>Chia sẻ</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { useUserStore } from "~/stores/user";
import { useLibraryStore } from "~/stores/library";
import { usePlayerStore } from "~/stores/player";

const { $axios } = useNuxtApp();
const route = useRoute();
const libraryStore = useLibraryStore();
const userStore = useUserStore();
const playerStore = usePlayerStore();

definePageMeta({
  layout: "default2",
});

const savedEpisodes = computed(() => libraryStore.savedEpisodes);

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

// Format duration
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};


// Play an episode
const playEpisode = (episode, index) => {
  if (savedEpisodes.value.length > 0) {
    const items = savedEpisodes.value.map(e => ({
      id: e.id,
      type: "podcast_episode"
    }));
    playerStore.setqueue(items, index);
  }
};

// Add to queue
const addToQueue = (episode) => {
  playerStore.addToQueue({
    id: episode.id,
    type: "podcast_episode"
  });
  const toast = useToast();
  toast.success("Đã thêm vào hàng đợi", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

// Remove from saved
const removeFromSaved = async (episode) => {
  try {
    const response = await $axios.post("/api/libraries/episodes/remove_saved_episode/", {
      episode_id: episode.id,
    });

    if (response.data.status === "success") {
      const toast = useToast();
      toast.success("Đã xóa khỏi danh sách đã lưu", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
      
      await libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error removing from saved:", error);
    const toast = useToast();
    toast.error("Không thể xóa khỏi danh sách đã lưu", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  }
};

// Share episode
const shareEpisode = async (episode) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}/episode/${episode.id}`);
    const toast = useToast();
    toast.success("Đã sao chép liên kết!", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  } catch (error) {
    console.error("Error sharing episode:", error);
    const toast = useToast();
    toast.error("Không thể sao chép liên kết", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  }
};

// Watch for route changes to refresh data
watch(() => route.path, async () => {
  await libraryStore.refreshAll();
});

// Initial data fetch
onMounted(async () => {
  await libraryStore.refreshAll();
});
</script>

<style scoped>
.saved-episodes-page {
  color: #fff;
  min-height: 100vh;
  background: linear-gradient(180deg, #345066 0%, #000000 100%);
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(180deg, rgba(91, 49, 231, 0.8) 0%, transparent 100%);
  z-index: 0;
}

.page-header {
  padding: 40px 0;
  z-index: 1;
}

.header-content {
  position: relative;
}

.header-cover {
  width: 232px;
  height: 232px;
  border-radius: 4px;
}

.header-title {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}

.user-name {
  color: #fff;
  font-weight: 500;
}

.btn-play {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #1ed760;
  border: none;
  transition: all 0.2s ease;
}

.btn-play:hover {
  transform: scale(1.05);
  background: #1fdf64;
}

.episode-item {
  transition: background 0.2s;
}

.episode-item:hover {
  background: rgba(255,255,255,0.1);
}

.episode-description {
  max-width: 600px;
}

/* Dropdown Menu */
.dropend:hover > .dropdown-menu {
  display: block;
  position: absolute;
  top: -200%;
  right: 100%;
  margin-left: 0;
}

.dropdown-menu {
  min-width: 200px;
  background-color: #282828;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
}

.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.dropdown-item {
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-item i {
  font-size: 1.2em;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
