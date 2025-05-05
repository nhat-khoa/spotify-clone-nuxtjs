<template>
  <div class="episode-page">
    <!-- Episode Header -->
    <div class="episode-header position-relative mb-4">
      <div class="gradient-background"></div>
      <div class="episode-info d-flex gap-4 p-4">
        <img
          :src="episode?.cover_art_image_url || episode?.podcast?.cover_art_image_url || '/images/default-episode.png'"
          :alt="episode?.title"
          class="episode-cover shadow"
        />
        <div class="episode-details d-flex flex-column justify-content-end">
          <span class="episode-type text-uppercase mb-2">Tập Podcast</span>
          <h1 class="episode-title mb-3">{{ episode?.title }}</h1>
          <div class="podcast-info d-flex align-items-center gap-2">
            <span 
              class="podcast-name text-white"
              @click="navigateTo(`/podcast/${episode?.podcast?.id}`)"
              style="cursor: pointer"
            >
              {{ episode?.podcast?.title }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Episode Controls -->
    <div class="episode-controls d-flex align-items-center gap-4 mb-4 px-4">
      <button
        class="btn-play d-flex align-items-center justify-content-center"
        @click="playEpisode"
      >
        <i class="ri-play-fill fs-3"></i>
      </button>
      <button
        class="btn-favorite bg-transparent border-0"
        @click="toggleSaveEpisode"
      >
        <i
          :class="
            episode?.is_saved
              ? 'ri-check-line text-success'
              : 'ri-add-line text-white'
          "
        ></i>
      </button>
      <button
        @click="shareEpisode"
        class="btn-options bg-transparent border-0 text-white"
      >
        <i class="ri-share-line"></i>
      </button>
    </div>

    <!-- Episode Details -->
    <div class="episode-content px-4">
      <div class="episode-meta d-flex align-items-center gap-3 text-secondary mb-4">
        <span>{{ formatDate(episode?.created_at) }}</span>
        <span>•</span>
        <span>{{ formatDuration(episode?.duration_ms) }}</span>
        <span v-if="episode?.season && episode?.episode_number">
          <span>•</span>
          <span class="ms-3">Mùa {{ episode?.season }}, Tập {{ episode?.episode_number }}</span>
        </span>
      </div>

      <div class="episode-description text-white mb-5">
        {{ episode?.description }}
      </div>

      <!-- Transcript Section (if available) -->
      <div v-if="episode?.transcript_url" class="transcript-section mb-4">
        <h3 class="section-title mb-3">Phụ đề</h3>
        <a 
          :href="episode.transcript_url" 
          target="_blank" 
          class="btn btn-outline-light"
        >
          <i class="ri-file-text-line me-2"></i>
          Xem phụ đề
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { usePlayerStore } from "~/stores/player";
import { useLibraryStore } from "~/stores/library";

const { $axios } = useNuxtApp();
const route = useRoute();
const toast = useToast();
const playerStore = usePlayerStore();
const libraryStore = useLibraryStore();

definePageMeta({
  layout: "default2",
});

const episode = ref(null);

// Fetch episode data
const fetchEpisode = async () => {
  try {
    const response = await $axios.get(
      `/api/podcasts/get_episode_details/?episode_id=${route.params.id}`
    );
    episode.value = response.data;
  } catch (error) {
    console.error("Error fetching episode:", error);``
  }
};
 

onMounted(async () => {
  await fetchEpisode();
});

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format duration
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes} phút ${seconds} giây`;
};

// Play episode
const playEpisode = () => {
  playerStore.initializeQueue([episode.value]);
  playerStore.play();
};

// Toggle save episode
const toggleSaveEpisode = async () => {
  try {
    const response = await $axios.post(
      `/api/libraries/episodes/${
        episode.value.is_saved ? "remove_saved_episode" : "save_episode"
      }/`,
      {
        episode_id: episode.value.id,
      }
    );

    if (response.data.status === "success") {
      episode.value.is_saved = !episode.value.is_saved;
      toast.success(
        episode.value.is_saved
          ? "Đã lưu tập"
          : "Đã xóa khỏi danh sách đã lưu",
        {
          timeout: 1500,
          position: "bottom-center",
          pauseOnHover: false,
          hideProgressBar: true,
          icon: true,
        }
      );
      await libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error toggling save episode:", error);
  }
};

// Share episode
const shareEpisode = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Đã sao chép liên kết!", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  } catch (error) {
    console.error("Error sharing episode:", error);
    toast.error("Không thể sao chép liên kết");
  }
};
</script>

<style scoped>
.episode-page {
  color: #fff;
  min-height: 100vh;
  background: linear-gradient(180deg, #1e3264 0%, #000000 100%);
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(180deg, rgba(30, 50, 100, 0.8) 0%, transparent 100%);
  z-index: 0;
}

.episode-header {
  padding: 40px 0;
  z-index: 1;
}

.episode-info {
  position: relative;
}

.episode-cover {
  width: 232px;
  height: 232px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}

.episode-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}

.podcast-name {
  font-weight: 500;
}

.podcast-name:hover {
  text-decoration: underline;
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

.btn-favorite {
  font-size: 2rem;
  transition: transform 0.2s;
}

.btn-favorite:hover {
  transform: scale(1.1);
}

.btn-options {
  font-size: 2rem;
  opacity: 0.7;
  transition: all 0.2s;
}

.btn-options:hover {
  opacity: 1;
  transform: scale(1.1);
}

.episode-description {
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-line;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>