<!-- components/SideBar2.vue -->
<template>
  <div class="sidebar d-flex flex-column p-0 ">
    <!-- Main Navigation -->
    <nav class="main-nav">
      <ul class="nav flex-column p-2">
        <SideBarNavItem v-for="item in mainNavItems" :key="item.path" :icon="item.icon" :path="item.path"
          :label="item.label" />
      </ul>
    </nav>

    <!-- Library Section -->
    <div class="library-section flex-grow-1 d-flex flex-column">
      <div class="library-header px-1 py-1">
        <div class="d-flex justify-content-between align-items-center">
          <button v-if="currentFolder" class="btn text-white text-decoration-none p-2 d-flex align-items-center"
            @click="back(currentFolder)">
            <i class="ri-arrow-left-line fs-5 me-2"></i>
            <span class="fw-medium">{{ currentFolder.name }}</span>
          </button>
          <button v-else class="btn text-white text-decoration-none p-2 d-flex align-items-center">
            <i class="ri-function-line fs-5 me-2"></i>
            <span class="fw-medium">Thư viện</span>
          </button>
          <div class="d-flex gap-1">
            <div class="dropdown">
              <button class="btn text-white p-1" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                title="Tạo playlist hoặc thư mục">
                <i class="bi bi-plus fs-4"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li>
                  <button class="dropdown-item d-flex align-items-center text-white gap-2" @click="createPlaylist()">
                    <i class="bi bi-music-note-list"></i>
                    Tạo danh sách phát
                  </button>
                </li>
                <li>
                  <button class="dropdown-item d-flex align-items-center text-white gap-2" @click="createFolder()">
                    <i class="bi bi-folder-plus"></i>
                    Tạo thư mục
                  </button>
                </li>
              </ul>
            </div>
            <button class="btn text-white p-1" title="Mở rộng thư viện">
              <i class="bi bi-chevron-right fs-5"></i>
            </button>
          </div>
        </div>

        <!-- Library Filters -->
        <div class="library-filters d-flex gap-2 px-2 py-2 overflow-auto">
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Danh sách phát</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Nghệ sĩ</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Album</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Podcast</button>
          <button class="btn btn-dark btn-sm rounded-pill px-3 py-1">Thư mục</button>
        </div>

        <!-- Search & Sort -->
        <div class="library-tools d-flex justify-content-between align-items-center px-2">
          <button class="btn text-white-50 p-1" title="Tìm kiếm trong thư viện">
            <i class="bi bi-search fs-6"></i>
          </button>
          <div class="d-flex align-items-center gap-2">
            <span class="text-white-50 small">Gần đây</span>
            <button class="btn text-white-50 p-1">
              <i class="bi bi-list fs-6"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Library Items -->

      <!-- Saved Songs -->
      <SideBarLibraryItem v-if="!currentFolder" :title="'Bài hát đã thích'" :subtitle="`${savedTracks.length} bài hát`"
        :image="'/images/liked-songs.jpg'" :type="'track'" :path="'/saved-songs'" />

      <!-- Saved episode -->
      <SideBarLibraryItem v-if="!currentFolder" :title="'Các tập đã thích'" :subtitle="`${savedEpisodes.length} tập`"
        :image="'/images/default-episode.png'" :type="'episode'" :path="'/saved-episodes'" />

      <!-- Followed Artists -->
      <SideBarLibraryItem v-for="artist in followedArtists" :key="artist.id" :title="artist.name" :subtitle="'Nghệ sĩ'"
        :image="artist.avatar_url || '/images/default-artist.png'" :type="'artist'" :path="`/artist/${artist.id}`" />


      <!-- Root Folders -->
      <template v-for="folder in folders" :key="folder.id">
        <!-- Folder -->
        <SideBarLibraryItem :title="folder.name" :subtitle="`${getFolderItemCount(folder)} mục`"
          :image="'/images/folder-icon6.png'" :type="'folder'" @clickFolder="navigateToFolder(folder)"
          :folders="folderMenuItems" :id="folder.id" 
          @refresh="refreshAll" />
      </template>

      <!-- Root Playlists -->
      <SideBarLibraryItem v-for="playlist in playlists" :key="playlist.id" :title="playlist.name"
        :subtitle="`Danh sách phát • ${playlist.user.full_name}`"
        :image="playlist.avatar_url || '/images/default-playlist.png'" :type="'playlist'"
        :path="`/playlist/${playlist.id}`" :folders="folderMenuItems" :id="playlist.id"
        @refresh="refreshAll" />

      <!-- Root albums -->
      <SideBarLibraryItem v-for="album in savedAlbums" :key="album.id" :title="album.title"
        :subtitle="`Album • ${album.artist.name}`" :image="album.avatar_url || '/images/default-album.jpg'"
        :type="'album'" :path="`/album/${album.id}`" />

      <!-- Root podcasts -->
      <SideBarLibraryItem v-for="podcast in savedPodcasts" :key="podcast.id" :title="podcast.title"
        :subtitle="`Podcast • ${podcast.podcaster.name}`"
        :image="podcast.cover_art_image_url || '/images/default-podcast.png'" :type="'podcast'"
        :path="`/podcast/${podcast.id}`" />


      <!-- Current Folder Playlists -->
      <template v-if="currentFolder">
        <SideBarLibraryItem v-for="playlist in currentFolder.playlists" :key="playlist.id" :title="playlist.name"
          :subtitle="`Danh sách phát • ${playlist.user.full_name}`"
          :image="playlist.avatar_url || '/images/default-playlist.png'" :type="'playlist'"
          :path="`/playlist/${playlist.id}`" :folders="folderMenuItems" :id="playlist.id"
          @refresh="refreshAll" />
        <!-- Current Folder subfolders -->
        <SideBarLibraryItem v-for="subfolder in currentFolder.subfolders" :key="subfolder.id" :title="subfolder.name"
          :subtitle="`${getFolderItemCount(subfolder)} mục`" :image="'/images/folder-icon6.png'" :type="'folder'"
          @clickFolder="navigateToFolder(subfolder)" :folders="folderMenuItems" :id="subfolder.id"
          @refresh="refreshAll" />
      </template>

    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const { $axios } = useNuxtApp();

const menuVisible = ref(false);
const menuX = ref(0);
const menuY = ref(0);


const showContextMenu = (event) => {
  console.log(event)
  menuVisible.value = true
  menuX.value = event.clientX
  menuY.value = event.clientY
}

onMounted(() => {
  document.addEventListener('click', () => {
    menuVisible.value = false
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', () => {
    menuVisible.value = false
  })
})

const mainNavItems = [
  {
    icon: 'ri-home-5-line',
    path: '/home',
    label: 'Trang chủ'
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
];

// Library data
const folders = ref([]);
const followedArtists = ref([]);
const playlists = ref([]);
const savedTracks = ref([]);
const savedEpisodes = ref([])
const savedAlbums = ref([])
const savedPodcasts = ref([])
const currentFolder = ref(null)
const folderMenuItems = ref([])

// Helper function to count items in a folder
const getFolderItemCount = (folder) => {
  const playlistCount = folder.playlists?.length || 0;
  const subfolderCount = folder.subfolders?.length || 0;
  return `${playlistCount + subfolderCount}`;
};

// Fetch library data
const fetchLibrary = async () => {
  try {
    const response = await $axios.get('/api/libraries/get_library/');
    if (response.status === 200) {
      currentFolder.value = null
      folderMenuItems.value = response.data.folders || [];
      folders.value = response.data.folders || [];
      followedArtists.value = response.data.followed_artists || [];
      playlists.value = response.data.playlists || [];
      savedTracks.value = response.data.saved_tracks || [];
      savedEpisodes.value = response.data.saved_episodes || []
      savedAlbums.value = response.data.saved_albums || []
      savedPodcasts.value = response.data.saved_podcasts || []
    }
    else {
      console.error('Status fail!');
    }
  } catch (error) {
    console.error('Error fetching library:', error);
  }
};

const navigateToFolder = async (folder) => {
  try {
    const response = await $axios.get(`/api/libraries/folders/get_folder_by_id?folder_id=${folder.id}`);

    if (response.status === 200) {
      currentFolder.value = response.data
      folders.value = [];
      followedArtists.value = [];
      playlists.value = [];
      savedTracks.value = [];
      savedEpisodes.value = [];
      savedAlbums.value = [];
      savedPodcasts.value = [];
    }
    else {
      console.error('Status fail!');
    }
  } catch (error) {
    console.error('Error fetching library:', error);
  }
};

const back = async (folder) => {
  if (!folder.parent) {
    await fetchLibrary()
  }
  else {
    await navigateToFolder({ id: folder.parent })
  }
}

const refreshAll = async () => {
  if (currentFolder.value) {
    const response = await $axios.get(`/api/libraries/folders/get_folders/`);
    if (response.status === 200) {
      folderMenuItems.value = response.data
    }
    await navigateToFolder({ id: currentFolder.value.id })
  }
  else {
    await fetchLibrary()
  }
}

const createPlaylist = async () => {
  try {
    const router = useRouter();
    const response = await $axios.post('/api/libraries/playlists/add_playlist/')
    // Refresh library data after creating
    await fetchLibrary()
    const data = response.data
    router.push(`/playlist/${data.id}`)
  } catch (error) {
    console.error('Error creating playlist:', error)
  }
}

const createFolder = async () => {
  try {
    const response = await $axios.post('/api/libraries/folders/add_folder/')
    // Refresh library data after creating
    const data = response.data
    // await fetchLibrary()
    navigateToFolder({ id: data.id })
  } catch (error) {
    console.error('Error creating folder:', error)
  }
}

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
  height: calc(100% - 120px);
  /* Subtract nav section height */
  overflow-y: auto;
}

.library-header {
  position: sticky;
  top: 0;
  background-color: #121212;
  border-radius: 8px 8px 0 0;
  z-index: 5000;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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