<template>
  <div class="saved-tracks-page">
    <!-- Header -->
    <div class="page-header position-relative mb-4">
      <div class="gradient-background"></div>
      <div class="header-content d-flex gap-4 p-4">
        <div class="header-cover shadow d-flex align-items-center justify-content-center bg-primary">
          <div class="d-flex align-items-center justify-content-center">
            <i class="ri-heart-fill fs-1 text-white"></i>
          </div>
        </div>
        <div class="header-info d-flex flex-column justify-content-end">
          <span class="header-type text-uppercase mb-2">Playlist</span>
          <h1 class="header-title mb-3" @click="console.log(userStore.user)">Bài hát đã thích</h1>
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
            <span class="track-count">{{ savedTracks.length }} bài hát</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="page-controls d-flex align-items-center gap-4 mb-4 px-4">
      <button 
        class="btn-play d-flex align-items-center justify-content-center"
        @click="playSong(savedTracks[0],0)" 
        v-if="savedTracks.length"
      >
        <i class="ri-play-fill fs-3"></i>
      </button>
    </div>

    <!-- Tracks List -->
    <div class="tracks-list px-4">
      <!-- Header -->
      <div class="tracks-header d-flex align-items-center text-secondary small border-bottom border-secondary py-2 px-3">
        <div class="col-1 text-center">#</div>
        <div class="col">Tiêu đề</div>
        <div class="col-md-3 d-none d-md-block">Album</div>
        <div class="col-md-2 d-none d-md-block">Ngày thêm</div>
        <div class="col-auto">
          <i class="ri-time-line"></i>
        </div>
      </div>

      <!-- Track Items -->
      <div class="tracks-body">
        <div 
          v-for="(track, index) in savedTracks" 
          :key="track.id"
          class="track-item d-flex align-items-center py-3 px-3 rounded position-relative"
          @dblclick="playSong(track,index)"
        >
          <div class="col-1 text-center text-secondary">{{ index + 1 }}</div>
          <div class="col d-flex align-items-center">
            <img
              :src="track.avatar_url || track.album?.avatar_url || '/images/default-track.png'"
              class="track-cover rounded me-3"
              width="40"
              height="40"
              :alt="track.title"
            />
            <div>
              <div class="track-title text-white">{{ track.title }}</div>
              <div
                class="track-artist text-secondary small"
                @click.stop="navigateTo(`/artist/${track.artist?.id}`)"
              >
                {{ track.artist?.name }}
              </div>
            </div>
          </div>
          <div 
            class="col-md-3 d-none d-md-block text-secondary text-truncate cursor-pointer "
            @click="navigateTo(`/album/${track.album?.id}`)"
          >
            {{ track.album?.title }}
          </div>
          <div class="col-md-2 d-none d-md-block text-secondary">
            {{ formatDate(track.created_at) }}
          </div>
          <div class="col-auto text-secondary me-3">
            {{ formatDuration(track.duration_ms) }}
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
                  @click="addToQueue(track)"
                >
                  <i class="ri-add-line"></i>
                  <span>Thêm vào hàng đợi</span>
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="removeFromFavourite(track)"
                >
                  <i class="ri-heart-fill text-success"></i>
                  <span>Xóa khỏi nhạc yêu thích</span>
                </button>
              </li>
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
                        @click="addToPlaylist(track, pl.id)"
                      >
                        <img
                          :src="pl.avatar_url || '/images/default-playlist.png'"
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
                  @click="navigateTo(`/artist/${track.artist?.id}`)"
                >
                  <i class="ri-user-line"></i>
                  <span>Xem thông tin nghệ sĩ</span>
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click="navigateTo(`/album/${track.album?.id}`)"
                >
                  <i class="ri-album-line"></i>
                  <span>Xem album</span>
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

const { $axios } = useNuxtApp();
const route = useRoute();
const libraryStore = useLibraryStore();
const userStore = useUserStore();
const playerStore = usePlayerStore();

definePageMeta({
  layout: "default2",
});

const savedTracks = computed(() => libraryStore.savedTracks);
const filteredPlaylists = computed(() => 
  libraryStore.playlists.filter(pl => pl.user_id === userStore.user?.id)
);

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

// Play a song
const playSong = (track,index) => {
  const items = savedTracks.value.map(t => ({
    id: t.id,
    type: "track"
  }));
  playerStore.setqueue(items, index);
};

// Add to queue
const addToQueue = (track) => {
  playerStore.addToQueue({
    id: track.id,
    type: "track"
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

// Remove from favorites
const removeFromFavourite = async (track) => {
  try {
    const response = await $axios.post("/api/libraries/tracks/remove_saved_track/", {
      track_id: track.id,
    });

    if (response.data.status === "success") {
      const toast = useToast();
      toast.success("Đã xóa khỏi danh sách yêu thích", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
      
      await libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};

// Add to playlist
const addToPlaylist = async (track, playlistId) => {
  try {
    const response = await $axios.post("/api/libraries/playlists/add_item_to_playlist/", {
      playlist_id: playlistId,
      item_id: track.id,
      item_type: "track",
    });

    if (response.data.status === "success") {
      const toast = useToast();
      toast.success("Đã thêm vào danh sách phát", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });

      await libraryStore.refreshAll();
    }
  } catch (error) {
    console.error("Error adding to playlist:", error);
  }
};
</script>

<style scoped>
.saved-tracks-page {

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

.track-item {
  transition: background 0.2s;
}

.track-item:hover {
  background: rgba(255,255,255,0.1);
}

.track-artist {
  cursor: pointer;
}

.track-artist:hover {
  text-decoration: underline;
  color: #fff !important;
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
</style>
