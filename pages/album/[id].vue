<template>
  <div v-if="album" class="album-page">
    <!-- Album Header -->
    <div class="album-header position-relative mb-4">
      <div class="gradient-background"></div>
      <div class="album-info d-flex gap-4 p-4">
        <img
          :src="album.avatar_url || '/images/default-album.png'"
          :alt="album.title"
          class="album-cover shadow"
        />
        <div class="album-details d-flex flex-column justify-content-end">
          <span class="album-type text-uppercase mb-2">Album</span>
          <h1 class="album-title mb-3">{{ album.title }}</h1>
          <div class="album-meta d-flex align-items-center flex-wrap gap-2">
            <img
              :src="album.artist.avatar_url || '/images/default-avatar.png'"
              class="artist-avatar rounded-circle"
              width="30"
              height="30"
              :alt="album.artist.name"
            />
            <span
              class="artist-name"
              @click="navigateTo(`/artist/${album.artist.id}`)"
            >
              {{ album.artist.name }}
            </span>
            <span class="bullet">•</span>
            <span class="album-year">{{
              new Date(album.created_at).getFullYear()
            }}</span>
            <span class="bullet">•</span>
            <span class="track-count">{{ album.tracks.length }} bài hát</span>
            <span class="bullet">•</span>
            <span class="duration">{{
              formatTotalDuration(getTotalDuration())
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Album Controls -->
    <div class="album-controls d-flex align-items-center gap-4 mb-4 px-4">
      <button
        class="btn-play d-flex align-items-center justify-content-center"
        @click="playSong(album.tracks[0],0)"
        v-if="album.tracks.length"
      >
        <i class="ri-play-fill fs-3"></i>
      </button>
      <button
        class="btn-favorite bg-transparent border-0"
        @click="toggleFavorite()"
      >
        <i
          :class="
            album.is_favorite
              ? 'ri-heart-fill text-success'
              : 'ri-heart-line text-white'
          "
        ></i>
      </button>
      <!-- share button -->
      <button
        @click="shareAlbum()"
        class="btn-options bg-transparent border-0 text-white"
      >
        <i class="ri-share-line"></i>
      </button>
    </div>

    <!-- Tracks List -->
    <div class="tracks-list px-4">
      <!-- Header -->
      <div
        class="tracks-header d-flex align-items-center text-secondary small border-bottom border-secondary py-2 px-3"
      >
        <div class="col-1 text-center">#</div>
        <div class="col">Tiêu đề</div>
        <div class="col-auto">
          <i class="ri-time-line"></i>
        </div>
      </div>

      <!-- Track Items -->
      <div class="tracks-body">
        <div
          v-for="(track, index) in album.tracks"
          :key="track.id"
          class="track-item d-flex align-items-center py-3 px-3 rounded position-relative"
          @dblclick="playSong(track, index)"
        >
          <div class="col-1 text-center text-secondary">{{ index + 1 }}</div>
          <!-- Track image -->
          <img
            :src="
              track.avatar_url ||
              album.avatar_url ||
              '/images/default-track.png'
            "
            class="track-cover rounded me-3"
            width="40"
            height="40"
            :alt="track.title"
          />
          <div class="col">
            <div class="track-title text-white">{{ track.title }}</div>
            <div
              class="track-artist text-secondary small"
              @click.stop="navigateTo(`/artist/${album.artist.id}`)"
            >
              {{ album.artist.name }}
            </div>
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
                  @click="addToFavourite(track)"
                >
                  <template
                    v-if="
                      !libraryStore.savedTracks.some((t) => t.id === track.id)
                    "
                  >
                    <i class="ri-heart-line"></i>
                    <span>Lưu vào nhạc yêu thích</span>
                  </template>
                  <template v-else>
                    <i class="ri-heart-fill text-success"></i>
                    <span>Xóa khỏi nhạc yêu thích</span>
                  </template>
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
                  @click="navigateTo(`/artist/${album.artist.id}`)"
                >
                  <i class="ri-user-line"></i>
                  <span>Xem thông tin nghệ sĩ</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Album Info -->
      <div class="album-footer mt-4 pb-4">
        <div class="text-secondary small">
          <div class="mb-2">
            {{
              new Date(album.created_at).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </div>
          <div v-if="album.copyright" class="mb-1">{{ album.copyright }}</div>
          <div v-if="album.label" class="mb-1">{{ album.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/user";
import { useToast } from "vue-toastification";
import { useLibraryStore } from "~/stores/library";
const { $axios, $sortable } = useNuxtApp();
const route = useRoute();
const libraryStore = useLibraryStore();
const userStore = useUserStore();
const player = usePlayerStore();

definePageMeta({
  layout: "default2",
});

const album = ref(null);
// track menu
const showTrackMenu = ref(false);
const showTrackMenuElement = ref(null);

//  submenuOpen
const submenuOpen = ref(false);

// Fetch album data
const fetchAlbum = async () => {
  try {
    const response = await $axios.get(
      `/api/libraries/albums/${route.params.id}/get_album_details`
    );
    album.value = response.data;
  } catch (error) {
    console.error("Error fetching album:", error);
  }
};

onMounted(async () => {
  await fetchAlbum();
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".position-relative")) {
      // showMoreMenu.value = false;
      // showPlaylistMenu.value = false;
    }
  });
  console.log(libraryStore.savedTracks)
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

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getTotalDuration = () => {
  if (!album.value?.tracks) return 0;
  if (Object.keys(album.value.tracks).length === 0) return 0;

  return album.value.tracks?.reduce(
    (total, item) => total + (item.duration_ms || 0),
    0
  );
};

const formatTotalDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} m`;
  }
  return `${minutes} m ${seconds} s`;
};

const toggleFavorite = async () => {
  const toast = useToast();
  try {
    const res = await $axios.post(
      `/api/libraries/albums/${
        album.value.is_favorite ? "remove_saved_album" : "save_album"
      }/`,
      {
        album_id: album.value.id,
      }
    );
    if (res.data.status === "success") {
      album.value.is_favorite = res.data.result.is_favorite;
      toast.success(
        album.value.is_favorite
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
      useLibraryStore().refreshAll();
    }
  } catch (error) {
    console.error("Error adding to favorite:", error);
  }
};

const shareAlbum = async () => {
  const toast = useToast();
  try {
    await navigator.clipboard.writeText(
      `http://localhost:3000/album/${album.value.id}`
    );
    toast.success("Đã copy!", {
      timeout: 1500,
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  } catch (err) {
    toast.error("Không thể copy: " + err);
  }
};

const playSong = async (track, index) => {
  const trackIds = album.value.tracks.map(t => t.id);
  player.setPlaylist(trackIds, index);
};

const addToFavourite = async (track) => {
  const res = await $axios.post(
    `/api/libraries/tracks/${
      libraryStore.savedTracks.some((track) => track.id === track.id)
        ? "remove_saved_track"
        : "save_track"
    }/`,
    {
      track_id: track.id,
    }
  );

  if (res.data.status === "success") {
    libraryStore.refreshAll();
  }

  const toast = useToast();
  toast.success("Đã thêm vào yêu thích", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

// Add song to another playlist
const addToPlaylist = async (track, playlistId) => {
  const toast = useToast();
  try {
    const response = await $axios.post(
      "/api/libraries/playlists/add_item_to_playlist/",
      {
        playlist_id: playlistId,
        item_id: track.id,
        item_type: "track",
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

const addToQueue = async (track) => {
  console.log("add queue");
};
</script>

<style scoped>
.album-page {
  color: #fff;
  min-height: 100vh;
  background: linear-gradient(180deg, #2c5686 0%, #0f0e0e 100%);
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(
    180deg,
    rgba(231, 144, 14, 0.8) 0%,
    transparent 100%
  );
  z-index: 0;
}

.album-header {
  z-index: 1;
  padding: 40px 24px 24px;
}

.album-info {
  position: relative;
}

.album-cover {
  width: 232px;
  height: 232px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}

.album-title {
  font-size: 5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
}

.artist-name {
  color: #fff;
  font-weight: 500;
  cursor: pointer;
}

.artist-name:hover {
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

.track-item {
  transition: background 0.2s;
}

.track-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.track-artist {
  cursor: pointer;
}

.track-artist:hover {
  text-decoration: underline;
  color: #fff !important;
}

.album-footer {
  opacity: 0.7;
}
/* 
.dropdown-menu {
  min-width: 200px;
  padding: 0.5rem;
}

.dropdown-item {
  border-radius: 4px;
  padding: 0.5rem;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-item i {
  font-size: 1.2em;
} */

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
</style>
