<template>
  <div class="podcast-page">
    <!-- Podcast Header -->
    <div class="podcast-header position-relative mb-4">
      <div class="gradient-background"></div>
      <div class="podcast-info d-flex gap-4 p-4">
        <img
          :src="podcast?.cover_art_image_url || '/images/default-podcast.png'"
          :alt="podcast?.title"
          class="podcast-cover shadow"
        />
        <div class="podcast-details d-flex flex-column justify-content-end">
          <span class="podcast-type text-uppercase mb-2">Podcast</span>
          <h1 class="podcast-title mb-3">{{ podcast?.title }}</h1>
          <div class="podcast-meta d-flex align-items-center flex-wrap gap-2">
            <span class="author-name">{{ podcast?.author_name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Podcast Controls -->
    <div class="podcast-controls d-flex align-items-center gap-4 mb-4 px-4">
      <button
        class="btn-play d-flex align-items-center justify-content-center"
        @click="playEpisode(podcast?.episodes[0], 0)"
        v-if="podcast?.episodes?.length"
      >
        <i class="ri-play-fill fs-3"></i>
      </button>
      <button
        class="btn-favorite bg-transparent border-0"
        @click="toggleFavorite()"
      >
        <i
          :class="
            podcast?.is_favorite
              ? 'ri-heart-fill text-success'
              : 'ri-heart-line text-white'
          "
        ></i>
      </button>
      <button
        @click="sharePodcast"
        class="btn-options bg-transparent border-0 text-white"
      >
        <i class="ri-share-line"></i>
      </button>
    </div>

    <!-- About Section -->
    <div class="about-section px-4 mb-5">
      <h2 class="section-title mb-3">Giới thiệu</h2>
      <div
        class="description text-secondary mb-4"
        v-if="podcast?.description?.vn"
      >
        {{ podcast.description.vn }}
      </div>
      <div class="additional-info text-secondary small">
        <div class="mb-2">{{ podcast?.licensor }}</div>
        <div class="mb-2">{{ podcast?.copyright_notice }}</div>
      </div>
    </div>

    <!-- Rate Section and category -->
    <div class="rating-section px-4 mb-4">
      <div class="d-flex align-items-center gap-3">
        <div class="rating-display">
          <div class="d-flex align-items-baseline gap-2">
            <span class="rating-average fs-4 fw-bold">{{
              podcast?.rate_average || 0
            }}</span>
            <span class="text-secondary">/5</span>
          </div>
        </div>
        <div class="rating-action">
          <button
            class="btn btn-outline-light btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#ratingModal"
          >
            <i v-if="podcast?.is_rating" class="ri-star-fill"></i>
            <i v-else class="ri-star-line me-1"></i>
          </button>
        </div>
        <!-- category -->
        <div class="category">
          <span
            v-for="category in podcast?.categories"
            :key="category.category__id"
            class="badge badge-pill badge-info cursor-pointer"
            >{{ category.category__name }}</span
          >
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <div class="modal fade" id="ratingModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-secondary">
            <h5 class="modal-title">Đánh giá podcast</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <h6 class="mb-3">{{ podcast?.title }}</h6>
              <div class="rating-stars d-flex justify-content-center gap-2">
                <template v-for="i in 5" :key="i">
                  <i
                    class="ri-star-fill fs-2"
                    :class="i <= tempRating ? 'text-warning' : 'text-secondary'"
                    @click="tempRating = i"
                    style="cursor: pointer"
                  ></i>
                </template>
              </div>
              <div class="mt-2 text-secondary">
                {{ ratingLabels[tempRating - 1] || "Chọn đánh giá của bạn" }}
              </div>
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="submitRating"
              :disabled="!tempRating"
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Episodes List -->
    <div class="episodes-list px-4">
      <h2 class="section-title mb-4">Tất cả tập</h2>
    
      <!-- Episode Items -->
    
      <div class="episodes-body">
        <div
          v-for="(episode, index) in podcast?.episodes"
          :key="episode.id"
          class="episode-item d-flex gap-3 p-3 rounded position-relative"
          @dblclick="playEpisode(episode, index)"
        >
          <img
            :src="
              episode.cover_art_image_url ||
              podcast?.cover_art_image_url ||
              '/images/default-episode.png'
            "
            class="episode-cover rounded"
            width="112"
            height="112"
            :alt="episode.title"
          />
          <div class="episode-info flex-grow-1">
            <div class="episode-title text-white mb-1">{{ episode.title }}</div>
            <div class="episode-meta text-secondary small mb-2">
              <span v-if="episode.season && episode.episode_number">
                S{{ episode.season }}E{{ episode.episode_number }} •
              </span>
              <span>{{ formatDate(episode.created_at) }}</span>
            </div>
            <div
              class="episode-description text-secondary small text-truncate-3"
            >
              {{ episode.description }}
            </div>
          </div>
          <div class="episode-actions d-flex align-items-start gap-3">
            <span class="text-secondary small">
              {{ formatDuration(episode.duration_ms) }}
            </span>
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
                    @click="toggleSaveEpisode(episode)"
                  >
                    <i
                      :class="
                        episode.is_favorite
                          ? 'ri-check-line text-success'
                          : 'ri-add-line'
                      "
                    ></i>
                    <span>{{
                      episode.is_favorite ? "Đã lưu" : "Lưu tập"
                    }}</span>
                  </button>
                </li>
                <li><hr class="dropdown-divider" /></li>

                <li>
                  <div class="dropend">
                    <button
                      class="dropdown-item d-flex align-items-center gap-2"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i class="ri-add-circle-line"></i>
                      <span>Thêm vào danh sách phát</span>
                      <i class="ri-arrow-right-s-line ms-auto"></i>
                    </button>
                    <ul
                      class="dropdown-menu dropdown-menu-dark"
                      style="max-height: 200px; overflow-y: auto"
                    >
                      <li v-for="pl in filteredPlaylists" :key="pl.id">
                        <button
                          class="dropdown-item d-flex align-items-center gap-2"
                          @click="addToPlaylist(episode, pl.id)"
                        >
                          <img
                            :src="
                              pl.avatar_url || '/images/default-playlist.png'
                            "
                            class="rounded"
                            width="30"
                            height="30"
                          />
                          <span class="text-truncate">{{ pl.name }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
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
const userStore = useUserStore();

definePageMeta({
  layout: "default2",
});

const podcast = ref(null);

// Fetch podcast data
const fetchPodcast = async () => {
  try {
    const response = await $axios.get(`/api/podcasts/${route.params.id}/`);
    podcast.value = response.data;
    console.log(podcast.value);
  } catch (error) {
    console.error("Error fetching podcast:", error);
  }
};

onMounted(async () => {
  await fetchPodcast();
});

// recursion
const getAllPlaylistsFromFolders = (folders) => {
  const playlists = [];
  for (const folder of folders) {
    playlists.push(...folder.playlists);
    if (folder.subfolders.length > 0) {
      playlists.push(...getAllPlaylistsFromFolders(folder.subfolders));
    }
  }
  return playlists;
};

// Filter playlists based on search query
const filteredPlaylists = computed(() => {
  return [
    ...libraryStore.playlists,
    ...getAllPlaylistsFromFolders(libraryStore.folders),
  ].filter(
    (p) =>
      p.user_id == userStore.user.id ||
      p.collaborators.some((c) => c.id == userStore.user.id)
  );
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
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Play episode
const playEpisode = (episode,index) => {
  if (podcast.value?.episodes?.length > 0) {
    const items = podcast.value.episodes.map(e => ({
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
  toast.success("Đã thêm vào hàng đợi", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

// Toggle favorite
const toggleFavorite = async () => {
  try {
    const response = await $axios.post(
      `/api/libraries/podcasts/${
        podcast.value.is_favorite ? "unfollow_podcast" : "follow_podcast"
      }/`,
      {
        podcast_id: podcast.value.id,
      }
    );

    if (response.data.status === "success") {
      podcast.value.is_favorite = response.data.result.is_favorite;
      toast.success(
        podcast.value.is_favorite
          ? "Đã thêm vào danh sách yêu thích"
          : "Đã xóa khỏi danh sách yêu thích",
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
    console.error("Error toggling favorite:", error);
  }
};

// Toggle save episode
const toggleSaveEpisode = async (episode) => {
  try {
    const response = await $axios.post(
      `/api/libraries/episodes/${
        episode.is_favorite ? "remove_saved_episode" : "save_episode"
      }/`,
      {
        episode_id: episode.id,
      }
    );

    if (response.data.status === "success") {
      episode.is_favorite = !episode.is_favorite;
      toast.success(
        episode.is_favorite ? "Đã lưu tập" : "Đã xóa khỏi danh sách đã lưu",
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

// Share podcast
const sharePodcast = async () => {
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
    console.error("Error sharing podcast:", error);
    toast.error("Không thể sao chép liên kết");
  }
};

// Share episode
const shareEpisode = async (episode) => {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}/episode/${episode.id}`
    );
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

// Add song to another playlist
const addToPlaylist = async (episode, playlistId) => {
  const toast = useToast();
  try {
    const response = await $axios.post(
      "/api/libraries/playlists/add_item_to_playlist/",
      {
        playlist_id: playlistId,
        item_id: episode.id,
        item_type: "podcast_episode",
      }
    );

    if (response.data.status === "success") {
      toast.success("Đã thêm vào danh sách phát", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });

      libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error adding to playlist:", error);
    toast.error("Không thể thêm vào danh sách phát");
  }
};

const tempRating = ref(null);
const ratingLabels = ref(["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"]);

const submitRating = async () => {
  try {
    const response = await $axios.post(
      `/api/podcasts/${route.params.id}/rate_podcast/`,
      {
        rating: tempRating.value,
      }
    );

    if (response.data.status === "success") {
      podcast.value.rate_average = response.data.result.rate_average;
      podcast.value.is_rating = response.data.result.is_rating;
      toast.success("Đánh giá thành công", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
    }
  } catch (error) {
    console.error("Error submitting rating:", error);
  }
};
</script>

<style scoped>
.podcast-page {
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
  background: linear-gradient(
    180deg,
    rgba(30, 50, 100, 0.8) 0%,
    transparent 100%
  );
  z-index: 0;
}

.podcast-header {
  padding: 40px 0;
  z-index: 1;
}

.podcast-info {
  position: relative;
}

.podcast-cover {
  width: 232px;
  height: 232px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}

.podcast-title {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}

.author-name {
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

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.episode-item {
  transition: background 0.2s;
}

.episode-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.episode-cover {
  object-fit: cover;
}

.episode-title {
  font-weight: 500;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dropdown Menu */
.dropdown-menu {
  min-width: 200px;
  background-color: #282828;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.3);
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

.dropend:hover > .dropdown-menu {
  display: block;
  position: absolute;
  top: -200%;
  right: 100%;
  margin-left: 0;
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

.rating-section {
  padding: 20px;
  background-color: #282828;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rating-display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-average {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.star {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.star:hover {
  color: #ffd700;
}

.rating-action {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rating-action button {
  background-color: #1ed760;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.rating-action button:hover {
  background-color: #1fdf64;
}

.modal-content {
  background-color: #282828;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: none;
  padding: 20px;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-body {
  padding: 20px;
}

.rating-stars {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.rating-star {
  font-size: 24px;
  margin-right: 10px;
  cursor: pointer;
}

.rating-star:hover {
  color: #ffd700;
}

.modal-footer {
  border-top: none;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.modal-footer button {
  background-color: #1ed760;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.modal-footer button:hover {
  background-color: #1fdf64;
}
</style>