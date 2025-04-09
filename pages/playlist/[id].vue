<template>
  <div class="playlist-page" v-if="playlist">
    <div class="playlist-header-wrapper">
      <div class="gradient-background"></div>
      <div class="playlist-header">
        <div class="playlist-cover">
          <img :src="playlist.avatar_url || 'https://picsum.photos/232/232'" alt="Playlist Cover" />
        </div>
        <div class="playlist-info">
          <span class="playlist-type">{{ playlist.is_public ? 'Public' : 'Private' }}  Playlist</span>
          <h1 class="playlist-title">{{ playlist.name }}</h1>
          <div class="playlist-description" v-if="playlist.description">
            {{ playlist.description }}
          </div>
          <div class="playlist-details">
            <span class="playlist-owner">{{ playlist.user?.full_name }}</span>
            <span class="playlist-stats">
              • {{ playlist.items?.length || 0 }} items,
              {{ formatTotalDuration(getTotalDuration()) }}
            </span>
            <span class="playlist-likes" v-if="playlist.likes_count > 0 && playlist.user_id == userStore.user.id">
              • {{ playlist.likes_count }} likes
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Playlist Controls -->
    <div class="playlist-controls">
      <button class="btn-play" @click="playAll" v-if="playlist.items?.length">
        <i class="ri-play-fill"></i>
      </button>
      <button class="btn-options">
        <i class="ri-more-fill"></i>
      </button>
    </div>

    <!-- Playlist Table -->
    <div class="playlist-table" v-if="playlist.items?.length">
      <div class="table-header">
        <div class="header-row">
          <div class="col-num">#</div>
          <div class="col-title">Title</div>
          <div class="col-album">Album</div>
          <div class="col-date">Date added</div>
          <div class="col-duration">
            <i class="ri-time-line"></i>
          </div>
        </div>
      </div>

      <!-- Draggable Songs List -->
      <draggable v-model="playlist.items" item-key="uid" handle=".drag-handle" @start="drag = true" @end="handleDragEnd"
        class="songs-list">
        <template #item="{ element, index }">
          <div class="song-row" :class="{ 'is-dragging': drag }" @dblclick="playSong(element)">
            <div class="col-num">
              <span class="drag-handle">
                <i class="ri-drag-move-fill"></i>
              </span>
              <span class="number">{{ index + 1 }}</span>
              <button class="btn-play-small" @click="playSong(element)">
                <i class="ri-play-fill"></i>
              </button>
            </div>
            <div class="col-title">
              <img :src="element.item_image || 'https://picsum.photos/50/50'" :alt="element.item_name"
                class="song-cover" />
              <div class="song-info">
                <span class="song-name">{{ element.item_name }}</span>
                <span class="song-artist">{{ element.owner_name }}</span>
              </div>
            </div>
            <div class="col-album">{{ element.album_or_podcast }}</div>
            <div class="col-date">{{ formatDate(element.created_at) }}</div>
            <div class="col-duration">{{ formatDuration(element.item_duration_ms) }}</div>
          </div>
        </template>
      </draggable>
    </div>

    <div v-else class="empty-playlist">
      <p>This playlist is empty. Add some songs!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'
import { useRoute } from 'vue-router'
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: 'default2'
})

const route = useRoute()
const { $axios } = useNuxtApp()
const playlist = ref(null)
const drag = ref(false)
const userStore = useUserStore();
// Fetch playlist data
const fetchPlaylist = async () => {
  try {
    const response = await $axios.get(`/api/libraries/playlists/get_playlist?playlist_id=${route.params.id}`)
    playlist.value = response.data
    if (playlist.value?.avatar_url) {
      extractColorFromImage(playlist.value.avatar_url)
    }
  } catch (error) {
    console.error('Error fetching playlist:', error)
  }
}

onMounted(() => {
  fetchPlaylist()
})

const handleDragEnd = async ({ moved }) => {
  drag.value = false
  // Here you would implement the API call to update the order
  console.log('Order updated:', moved)
}

const playAll = () => {
  if (playlist.value?.items?.length) {
    playSong(playlist.value.items[0])
  }
}

const playSong = (song) => {
  console.log('Playing:', song.item_name)
  // Implement your play functionality here
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const getTotalDuration = () => {
  if (!playlist.value?.items) return 0
  return playlist.value.items.reduce((total, item) => total + (item.item_duration_ms || 0), 0)
}

const formatTotalDuration = (ms) => {
  const totalMinutes = Math.floor(ms / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  }
  return `${minutes} min`
}
</script>

<style scoped>
.playlist-page {
  color: #fff;
}

.playlist-header-wrapper {
  position: relative;
  padding: 24px;
  margin: -24px -24px 0;
  background-color: #8b5959;
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    var(--playlist-color) 0%,
    rgba(206, 69, 69, 0.5) 50%,
    #b65959 100%
  );
  opacity: 0.8;
  transition: background 0.3s ease;
}

.playlist-header {
  position: relative;
  display: flex;
  gap: 24px;
  padding: 80px 24px 24px;
  z-index: 1;
  min-height: 340px;
}

.playlist-cover {
  width: 232px;
  height: 232px;
  box-shadow: 0 4px 60px rgba(0,0,0,.5);
  flex-shrink: 0;
}

.playlist-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.playlist-type {
  font-size: 0.875rem;
  font-weight: 500;
}

.playlist-title {
  font-size: 6rem;
  font-weight: 700;
  margin: 0.3em 0;
}

.playlist-description {
  color: #e7e6e6;
  font-weight: 700;
  margin-bottom: 1em;
}

.playlist-details {
  font-size: 0.875rem;
  color: #e7e6e6;
}

.playlist-owner {
  font-weight: 700;
  color: #e7e6e6;
}

.playlist-stats {
  font-weight: 700;
  color: #bbbaba;
}

.playlist-likes {
  font-weight: 700;
 color: #bbbaba;
}

.playlist-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.btn-play {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1ed760;
  border: none;
  color: #000;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-play:hover {
  transform: scale(1.05);
  background-color: #1fdf64;
}

.btn-options {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #a7a7a7;
  font-size: 20px;
  cursor: pointer;
}

.btn-options:hover {
  color: #fff;
}

.playlist-table {
  width: 100%;
}

.table-header {
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  color: #a7a7a7;
  font-size: 0.875rem;
}

.header-row,
.song-row {
  display: grid;
  grid-template-columns: 40px 4fr 2fr 2fr 1fr;
  padding: 8px 16px;
  align-items: center;
}

.songs-list {
  margin-top: 16px;
}

.song-row {
  border-radius: 4px;
  cursor: pointer;
}

.song-row:hover {
  background-color: rgba(255, 255, 255, .1);
}

.song-row.is-dragging {
  background-color: rgba(255, 255, 255, .2);
}

.col-num {
  display: flex;
  align-items: center;
  gap: 16px;
}

.drag-handle {
  cursor: move;
  opacity: 0;
}

.song-row:hover .drag-handle {
  opacity: 1;
}

.number {
  color: #a7a7a7;
}

.btn-play-small {
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

.song-row:hover .number {
  display: none;
}

.song-row:hover .btn-play-small {
  display: block;
}

.col-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.song-cover {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.song-info {
  display: flex;
  flex-direction: column;
}

.song-artist {
  color: #a7a7a7;
  font-size: 0.875rem;
}

.col-album,
.col-date {
  color: #a7a7a7;
}

.empty-playlist {
  text-align: center;
  color: #a7a7a7;
  padding: 40px;
}
</style>
