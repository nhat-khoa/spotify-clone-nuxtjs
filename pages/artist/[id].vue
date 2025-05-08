<template>
  <div class="artist-page">
    <!-- Hero Section -->
    <div class="hero-section" :style="{ backgroundImage: `url(${artist.gallery_images?.[0]?.image_url || '/images/banner/artists.jpg'})` }">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="row align-items-end">
          <div class="col-12">
            <div class="d-flex align-items-center gap-4">
              <div class="artist-avatar">
                <img :src="artist.avatar_url || '/images/default-avatar.png'" :alt="artist.name" />
              </div>
              <div class="artist-info">
                <h1 class="artist-name text-white">{{ artist.name }}</h1>
                <p class="monthly-listeners text-white" v-if="artist.popularity">
                  {{ formatNumber(artist.popularity) }} monthly listeners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="container content-section">
      <!-- Action Buttons -->
      <div class="action-buttons mb-4">
        <button class="btn btn-success btn-lg me-3"
        @click="playTrack(popularTracks[0], 0)"
        >
          <i class="ri-play-fill"></i> Play
        </button>
        <button class="btn btn-outline-light btn-lg me-3 rounded-pill"
        @click="toggleFavorite()"
        >
           {{ artist.is_favorite ? 'Đang theo dõi' : 'Theo dõi' }}
        </button>
        <!-- share button -->
      <button
        @click="shareArtist()"
        class="btn-options bg-transparent border-0 text-white"
      >
        <i class="ri-share-line"></i>
      </button>
      </div>

      <!-- Popular Tracks -->
      <div class="section mb-5">
        <h2 class="section-title">Popular</h2>
        <div class="popular-tracks">
          <div v-for="(track, index) in popularTracks" :key="track.id" 
               class="track-item d-flex align-items-center p-2" 
               @click="playTrack(track, index)">
            <div class="track-number me-3">{{ index + 1 }}</div>
            <div class="track-image me-3">
              <img :src="track.album.avatar_url || '/images/default-album.png'" :alt="track.title" />
              <div class="play-overlay">
                <i class="ri-play-fill"></i>
              </div>
            </div>
            <div class="track-info flex-grow-1">
              <div class="track-title">{{ track.title }}</div>
              <div class="track-plays">{{ formatNumber(track.popularity || 0) }} plays</div>
            </div>
            <div class="track-duration">
              {{ formatDuration(track.duration_ms) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Albums -->
      <div class="section mb-5">
        <h2 class="section-title">Albums</h2>
        <div class="row g-4">
          <div v-for="album in artist.albums" :key="album.id" class="col-md-2">
            <div class="album-card" @click="navigateToAlbum(album.id)">
              <div class="album-image">
                <img :src="album.avatar_url || '/images/default-album.png'" :alt="album.title" />
                <div class="play-overlay">
                  <i class="ri-play-fill"></i>
                </div>
              </div>
              <div class="album-info mt-2">
                <div class="album-title">{{ album.title }}</div>
                <div class="album-year">{{ formatDate(album.created_at) }} • {{ album.album_type || 'Album' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div class="section mb-5" v-if="artist.gallery_images?.length">
        <h2 class="section-title">Gallery</h2>
        <div class="row g-4">
          <div v-for="image in artist.gallery_images" :key="image.id" class="col-md-3">
            <div class="gallery-image">
              <img :src="image.image_url" :alt="artist.name" />
            </div>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="section mb-5" v-if="artist.bio">
        <h2 class="section-title">About</h2>
        <div class="artist-bio">
          {{ artist.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from "vue-toastification";
const { $axios, $sortable } = useNuxtApp();
const player = usePlayerStore();


const route = useRoute();
const artist = ref({});
const isLoading = ref(true);

definePageMeta({
  layout: 'default2'
})

// Get top 5 tracks sorted by popularity
const popularTracks = computed(() => {
  return [...(artist.value.tracks || [])]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0,5);
});

// Fetch artist data
const fetchArtist = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get(`/api/libraries/artists/${route.params.id}/get_artist/`);
    artist.value = response.data.result;
  } catch (error) {
    console.error('Error fetching artist:', error);
  } finally {
    isLoading.value = false;
  }
};

// Format number with commas
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// Format duration from milliseconds to MM:SS
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

// Format date to year only
const formatDate = (dateString) => {
  return new Date(dateString).getFullYear();
};

// Navigation
const navigateToAlbum = (albumId) => {
  navigateTo(`/album/${albumId}`);
};

// Play track
const playTrack = (track, index) => {
  const items = popularTracks.value.map(t => ({
    id: t.id,
    type: "track"
  }));
  player.setqueue(items, index);
};

// Fetch data on mount
onMounted(() => {
  fetchArtist();
});

const toggleFavorite = async () => {
  const toast = useToast();
  try {
    const res = await $axios.post(
      `/api/libraries/artists/${
        artist.value.is_favorite ? "unfollow_artist" : "follow_artist"
      }/`,
      {
        artist_id: artist.value.id,
      }
    );
    if (res.data.status === "success") {
      artist.value.is_favorite = res.data.result.is_favorite;
      toast.success(
        artist.value.is_favorite
          ? "Đã theo dõi"
          : "Đã hủy theo dõi",
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
}

const shareArtist = () => {
  const toast = useToast();
  navigator.clipboard.writeText(window.location.href);
  toast.success("Đã sao chép URL", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

</script>

<style scoped>
.artist-page {
  background: #121212;
  min-height: 100vh;
  color: white;
}

.hero-section {
  height: 50vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent 0%, rgba(0,0,0,0.8) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 2rem;
}

.artist-avatar img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}

.artist-name {
  font-size: 5rem;
  font-weight: 700;
  margin: 0;
}

.content-section {
  padding: 2rem 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.track-item {
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.track-item:hover {
  background-color: rgba(255,255,255,0.1);
}

.track-image {
  width: 40px;
  height: 40px;
  position: relative;
}

.track-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.track-item:hover .play-overlay {
  opacity: 1;
}

.album-card {
  cursor: pointer;
}

.album-image {
  position: relative;
  aspect-ratio: 1;
}

.album-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-card:hover .play-overlay {
  opacity: 1;
}

.gallery-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
}

.track-title {
  font-weight: 500;
}

.track-plays, .album-year {
  color: #b3b3b3;
  font-size: 0.875rem;
}

.monthly-listeners {
  color: #b3b3b3;
  font-size: 0.875rem;
  margin: 0;
}
</style>
