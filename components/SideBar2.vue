<!-- components/SideBar2.vue -->
<template>
  <div class="sidebar d-flex flex-column p-0">
    <!-- Main Navigation -->
    <nav class="main-nav mb-2">
      <ul class="nav flex-column p-2">
        <SideBarNavItem 
          v-for="item in mainNavItems" 
          :key="item.path" 
          :icon="item.icon" 
          :path="item.path" 
          :label="item.label" 
        />
      </ul>
    </nav>

    <!-- Library Section -->
    <div class="library-section flex-grow-1 d-flex flex-column">
      <div class="library-header px-2 py-2">
        <div class="d-flex justify-content-between align-items-center">
          <button class="btn btn-link text-white text-decoration-none p-2 d-flex align-items-center">
            <i class="ri-function-line fs-5 me-2"></i>
            <span class="fw-medium">Thư viện</span>
          </button>
          <div class="d-flex gap-1">
            <button class="btn btn-link text-white p-2" title="Tạo playlist hoặc thư mục">
              <i class="ri-add-line fs-5"></i>
            </button>
            <button class="btn btn-link text-white p-2" title="Mở rộng thư viện">
              <i class="ri-arrow-right-line fs-5"></i>
            </button>
          </div>
        </div>

        <!-- Library Filters -->
        <div class="library-filters d-flex gap-2 px-2 py-2 overflow-auto">
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Danh sách phát</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Nghệ sĩ</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Album</button>
        </div>

        <!-- Search & Sort -->
        <div class="library-tools d-flex justify-content-between align-items-center px-2">
          <button class="btn btn-link text-white-50 p-2" title="Tìm kiếm trong thư viện">
            <i class="ri-search-line"></i>
          </button>
          <div class="d-flex align-items-center gap-2">
            <span class="text-white-50 small">Gần đây</span>
            <button class="btn btn-link text-white-50 p-2">
              <i class="ri-list-unordered"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Library Items -->
      <div class="library-items flex-grow-1 overflow-auto px-1">
        <!-- Liked Songs -->
        <SideBarLibraryItem
          v-if="savedTracks.length > 0"
          :title="'Bài hát đã thích'"
          :subtitle="`${savedTracks.length} bài hát`"
          :image="'/images/liked-songs.jpg'"
          :type="'playlist'"
          :path="'/saved-songs'"
        />

        <!-- Followed Artists -->
        <SideBarLibraryItem
          v-for="artist in followedArtists"
          :key="artist.id"
          :title="artist.name"
          :subtitle="'Nghệ sĩ'"
          :image="artist.avatar_url || '/images/default-artist.png'"
          :type="'artist'"
          :path="`/artist/${artist.id}`"
        />

        <!-- Saved episode -->
        <SideBarLibraryItem
          v-if="savedEpisodes.length == 0"
          :title="'Các tập đã thích'"
          :subtitle="`${savedEpisodes.length} tập`"
          :image="'/images/default-episode.png'"
          :type="'episode'"
          :path="'/saved-episodes'"
        />

        <!-- Root Folders -->
        <template v-for="folder in folders" :key="folder.id">
          <!-- Folder -->
          <SideBarLibraryItem
            :title="folder.name"
            :subtitle="`${getFolderItemCount(folder)} mục`"
            :image="'/images/folder-icon6.png'"
            :type="'folder'"
            :path="`/folder/${folder.id}`"
          />
          
          <!-- Folder's Playlists -->
          <!-- <SideBarLibraryItem
            v-for="playlist in folder.playlists"
            :key="playlist.id"
            :title="playlist.name"
            :subtitle="`Danh sách phát • ${playlist.user.full_name}`"
            :image="playlist.avatar_url || '/images/default-playlist.png'"
            :type="'playlist'"
            :path="`/playlist/${playlist.id}`"
          /> -->

          <!-- Subfolders (recursive) -->
          <!-- <template v-for="subfolder in folder.subfolders" :key="subfolder.id">
            <SideBarLibraryItem
              :title="subfolder.name"
              :subtitle="`${getFolderItemCount(subfolder)} mục`"
              :image="'/images/folder-icon6.png'"
              :type="'folder'"
              :path="`/folder/${subfolder.id}`"
            />
          </template> -->
        </template>

        <!-- Root Playlists -->
        <SideBarLibraryItem
          v-for="playlist in rootPlaylists"
          :key="playlist.id"
          :title="playlist.name"
          :subtitle="`Danh sách phát • ${playlist.user.full_name}`"
          :image="playlist.avatar_url || '/images/default-playlist.png'"
          :type="'playlist'"
          :path="`/playlist/${playlist.id}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const mainNavItems = [
  { 
    icon: 'ri-home-5-line', 
    path: '/home', 
    label: 'Trang chủ' 
  },
  { 
    icon: 'ri-search-line', 
    path: '/search', 
    label: 'Tìm kiếm' 
  },
  {
    icon: 'ri-user-line',
    path: '/profile',
    label: 'Tài khoản'
  },
  {
    icon: 'ri-heart-line',
    path: '/favorite',
    label: 'Bài hát yêu thích'
  },
  {
    icon: 'ri-history-line',
    path: '/history',
    label: 'Lịch sử nghe'
  },
  {
    icon: 'ri-vip-crown-2-line',
    path: '/premium',
    label: 'Premium'
  }
];

// Library data
const folders = ref([]);
const followedArtists = ref([]);
const playlists = ref([]);
const savedTracks = ref([]);
const savedEpisodes = ref([])
const savedAlbums = ref([])
const savedPodcasts = ref([])

// Computed property for root playlists (not in any folder)
const rootPlaylists = computed(() => {
  return playlists.value.filter(playlist => 
    !folders.value.some(folder => 
      folder.playlists.some(p => p.id === playlist.id)
    )
  );
});

// Helper function to count items in a folder
const getFolderItemCount = (folder) => {
  const playlistCount = folder.playlists.length;
  const subfolderCount = folder.subfolders.length;
  return `${playlistCount + subfolderCount}`;
};

// Fetch library data
const fetchLibrary = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get('http://127.0.0.1:8000/api/libraries/get_library/');
    if (response.data.status === 'success') {
      folders.value = response.data.folders || [];
      followedArtists.value = response.data.followed_artists || [];
      playlists.value = response.data.playlists || [];
      savedTracks.value = response.data.saved_tracks || [];
      savedEpisodes.value = response.data.saved_episodes || []
      savedAlbums.value = response.data.saved_albums || []
      savedPodcasts.value = response.data.saved_podcasts || []

    }
  } catch (error) {
    console.error('Error fetching library:', error);
  }
};

onMounted(() => {
  fetchLibrary();
});
</script>

<style scoped>
.sidebar {
  height: 100vh;
  width: 300px;
  background-color: #000;
  color: #fff;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ffffff40 transparent;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #ffffff40;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff60;
}

.library-section {
  background-color: #121212;
  border-radius: 8px;
  margin: 0 4px 8px;
  height: calc(100vh - 120px);
}

.library-header {
  background-color: #121212;
  border-radius: 8px 8px 0 0;
}

.library-filters {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.library-filters::-webkit-scrollbar {
  display: none;
}

.library-filters .btn {
  background-color: #232323;
  border: none;
  font-size: 0.75rem;
  white-space: nowrap;
  padding: 4px 12px;
}

.library-filters .btn:hover {
  background-color: #2a2a2a;
}

.library-tools {
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.btn-link {
  color: #fff;
}

.btn-link:hover {
  color: #fff;
}

.library-items {
  scrollbar-width: thin;
  scrollbar-color: #ffffff40 transparent;
}

.library-items::-webkit-scrollbar {
  width: 4px;
}

.library-items::-webkit-scrollbar-track {
  background: transparent;
}

.library-items::-webkit-scrollbar-thumb {
  background-color: #ffffff40;
  border-radius: 4px;
}

.library-items::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff60;
}
</style>