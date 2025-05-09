<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/home.jpg)"
  ></div>
  <div class="under-hero container">
    <!-- Top Tracks Section -->
    <div class="section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Trending to listen</span>
          <h3 class="mb-0">Top <span class="text-primary">Tracks</span></h3>
        </div>
        <NuxtLink to="/tracks" class="btn btn-link">View All</NuxtLink>
      </div>
      <div class="list list--lg list--order">
        <div class="row">
          <div v-for="track in topTracks" :key="track.id" class="col-xl-6">
            <div class="list__item" @click="playTrack(track)">
              <div class="list__cover">
                <img
                  :src="
                    track.album?.avatar_url ||
                    track.avatar_url ||
                    '/images/cover/small.jpg'
                  "
                  :alt="track.title"
                  style="width: 100%; height: 100%; object-fit: cover"
                />
                <button
                  class="btn btn-play btn-sm btn-default btn-icon rounded-pill"
                >
                  <i class="ri-play-fill icon-play"></i>
                </button>
              </div>
              <div class="list__content">
                <h6 class="list__title">{{ track.title }}</h6>
                <p class="list__subtitle">{{ track.album?.artist?.name }}</p>
              </div>
              <ul class="list__option">
                <li>{{ formatDuration(track.duration_ms) }}</li>
                <li>
                  <div class="dropdown" @click.stop="">
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
                              !libraryStore.savedTracks.some(
                                (t) => t.id === track.id
                              )
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
                                  :src="
                                    pl.avatar_url ||
                                    '/images/default-playlist.png'
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
                          @click="navigateTo(`/artist/${track.artist.id}`)"
                        >
                          <i class="ri-user-line"></i>
                          <span>Xem thông tin nghệ sĩ</span>
                        </button>
                      </li>
                      <li>
                        <button
                          class="dropdown-item d-flex align-items-center gap-2"
                          @click="navigateTo(`/album/${track.album.id}`)"
                        >
                          <i class="ri-information-line"></i>
                          <span>Xem thông tin album</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Artists Section -->
    <div class="section artists-section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Best to listen</span>
          <h3 class="mb-0">Top <span class="text-primary">Artists</span></h3>
        </div>
        <NuxtLink to="/artists" class="btn btn-link">View All</NuxtLink>
      </div>
      <div class="row g-4">
        <div
          v-for="artist in topArtists"
          :key="artist.id"
          class="col-6 col-md-4 col-lg-3 col-xl-2"
          @click="navigateTo('/artist/' + artist.id)"
        >
          <div class="artist-card">
            <NuxtLink :to="'/artist/' + artist.id" class="artist-card__link">
              <div class="artist-card__image">
                <img
                  :src="artist.avatar_url || '/images/cover/small.jpg'"
                  :alt="artist.name"
                />
              </div>
              <div class="artist-card__content">
                <h5 class="artist-card__name">{{ artist.name }}</h5>
                <p class="artist-card__followers">
                  {{ formatNumber(artist.followers || 0) }} followers
                </p>
              </div>
            </NuxtLink>
            <button
              class="btn btn-primary btn-sm rounded-pill artist-card__play"
              @click.stop="toggleFavoriteArtist(artist)"
            >
              <i
                :class="
                  artist?.is_favorite
                    ? 'ri-heart-fill text-white'
                    : 'ri-heart-line text-white'
                "
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Albums Section -->
    <div class="section albums-section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">New releases</span>
          <h3 class="mb-0">Latest <span class="text-primary">Albums</span></h3>
        </div>
        <NuxtLink to="/albums" class="btn btn-link">View All</NuxtLink>
      </div>
      <div class="row g-4">
        <div
          v-for="album in latestAlbums"
          :key="album.id"
          class="col-md-6 col-lg-4 col-xl-3"
        >
          <div class="album-card">
            <div class="album-card__cover">
              <img
                :src="album.avatar_url || '/images/cover/small.jpg'"
                :alt="album.title"
              />
              <div class="album-card__overlay">
                <button
                  class="btn btn-primary btn-lg btn-icon rounded-circle album-card__play"
                  @click="navigateTo('/album/' + album.id)"
                >
                  <i class="ri-play-fill"></i>
                </button>
              </div>
            </div>
            <div class="album-card__content">
              <NuxtLink :to="'/album/' + album.id" class="album-card__title">{{
                album.title
              }}</NuxtLink>
              <p class="album-card__subtitle">
                <NuxtLink
                  :to="'/artist/' + album.artist?.id"
                  class="album-card__artist"
                >
                  {{ album.artist?.name }}
                </NuxtLink>
              </p>
              <div class="album-card__meta">
                <span class="album-card__year">{{
                  new Date(album.created_at).getFullYear()
                }}</span>
                <span class="album-card__tracks"
                  >{{ album.tracks_count || 0 }} tracks</span
                >
                <button
                  class="btn btn-sm"
                  @click.stop="toggleFavoriteAlbum(album)"
                >
                  <i
                    :class="
                      album?.is_favorite
                        ? 'ri-heart-fill text-success'
                        : 'ri-heart-line text-white'
                    "
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Podcasts Section -->
    <!-- Top Podcasts Section -->
    <div class="section podcasts-section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Featured shows</span>
          <h3 class="mb-0">
            Popular <span class="text-primary">Podcasts</span>
          </h3>
        </div>
        <NuxtLink to="/podcasts" class="btn btn-link">View All</NuxtLink>
      </div>
      <div class="row g-4">
        <div
          v-for="podcast in popularPodcasts"
          :key="podcast.id"
          class="col-md-6 col-lg-4 col-xl-3"
          @click="navigateTo(`/podcast/${podcast.id}`)"
        >
          <div class="podcast-card">
            <div class="podcast-card__cover">
              <img
                :src="podcast.cover_art_image_url || '/images/cover/small.jpg'"
                :alt="podcast.title"
              />
              <div class="podcast-card__overlay">
                <NuxtLink
                  :to="'/podcast/' + podcast.id"
                  class="btn btn-primary btn-lg btn-icon rounded-circle podcast-card__play"
                >
                  <i class="ri-headphone-fill"></i>
                </NuxtLink>
              </div>
            </div>
            <div class="podcast-card__content">
              <h4 class="podcast-card__title">{{ podcast.title }}</h4>
              <p class="podcast-card__author">By {{ podcast.author_name }}</p>
              <div class="podcast-card__meta">
                <span class="podcast-card__episodes"
                  >{{ podcast.episodes_count || 0 }} episodes</span
                >
                <span class="podcast-card__language">{{
                  podcast.language || "Unknown"
                }}</span>
                <button
                  class="btn btn-sm"
                  @click.stop="toggleFavoritePodcast(podcast)"
                >
                  <i
                    :class="
                      podcast?.is_favorite
                        ? 'ri-heart-fill text-success'
                        : 'ri-heart-line text-white'
                    "
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { usePlayerStore } from "~/stores/player";
import { useLibraryStore } from "~/stores/library";

const { $axios } = useNuxtApp();
const toast = useToast();
const playerStore = usePlayerStore();
const libraryStore = useLibraryStore();
const userStore = useUserStore();

definePageMeta({
  layout: "default2",
});

const route = useRoute();
const topTracks = ref([]);
const topArtists = ref([]);
const latestAlbums = ref([]);
const popularPodcasts = ref([]);
const isSearching = ref(false);

// Watch for changes in the query parameter
watch(() => route.query.q, async (newQuery) => {
  if (newQuery) {
    await fetchSearchResults(newQuery);
  } else {
    await fetchHome();
  }
}, {  });

onMounted(async () => {
  if (route.query.q) {
    await fetchSearchResults(route.query.q);
  } else {
    await fetchHome();
  }
});

const fetchSearchResults = async (query) => {
  try {
    isSearching.value = true;
    const response = await $axios.get(`/api/libraries/search/?q=${encodeURIComponent(query)}`);
    topTracks.value = response.data.tracks || [];
    topArtists.value = response.data.artists || [];
    latestAlbums.value = response.data.albums || [];
    popularPodcasts.value = response.data.podcasts || [];
  } catch (error) {
    console.error('Error fetching search results:', error);
  } finally {
    isSearching.value = false;
  }
};

const fetchHome = async () => {
  try {
    const response = await $axios.get('/api/libraries/home/');
    topTracks.value = response.data.tracks;
    topArtists.value = response.data.artists;
    latestAlbums.value = response.data.albums;
    popularPodcasts.value = response.data.podcasts;
  } catch (error) {
    console.error('Error fetching home data:', error);
  }
};

const playTrack = async (track) => {
  await $axios.post("/api/histories/", {
    track_id: track.id,
  });
  playerStore.setqueue([{ id: track.id, type: "track" }], 0);
};

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, "0")}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// toggle favorite
const toggleFavoritePodcast = async (podcast) => {
  try {
    const response = await $axios.post(
      `/api/libraries/podcasts/${
        podcast.is_favorite ? "unfollow_podcast" : "follow_podcast"
      }/`,
      {
        podcast_id: podcast.id,
      }
    );

    if (response.data.status === "success") {
      podcast.is_favorite = response.data.result.is_favorite;
      toast.success(
        podcast.is_favorite
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

const toggleFavoriteAlbum = async (album) => {
  const toast = useToast();
  try {
    const res = await $axios.post(
      `/api/libraries/albums/${
        album.is_favorite ? "remove_saved_album" : "save_album"
      }/`,
      {
        album_id: album.id,
      }
    );
    if (res.data.status === "success") {
      album.is_favorite = res.data.result.is_favorite;
      toast.success(
        album.is_favorite
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

const toggleFavoriteArtist = async (artist) => {
  const toast = useToast();
  try {
    const res = await $axios.post(
      `/api/libraries/artists/${
        artist.is_favorite ? "unfollow_artist" : "follow_artist"
      }/`,
      {
        artist_id: artist.id,
      }
    );
    if (res.data.status === "success") {
      artist.is_favorite = res.data.result.is_favorite;
      toast.success(artist.is_favorite ? "Đã theo dõi" : "Đã hủy theo dõi", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
      useLibraryStore().refreshAll();
    }
  } catch (error) {
    console.error("Error adding to favorite:", error);
  }
};

const addToQueue = async (track) => {
  playerStore.addToQueue({
    id: track.id,
    type: "track",
  });

  toast.success("Đã thêm vào hàng đợi", {
    timeout: 1500,
    position: "bottom-center",
    pauseOnHover: false,
    hideProgressBar: true,
    icon: true,
  });
};

const addToFavourite = async (track) => {
  const res = await $axios.post(
    `/api/libraries/tracks/${
      libraryStore.savedTracks.some((tracke) => tracke.id === track.id)
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
</script>

<style scoped>
.hero {
  height: 300px;
  background-size: cover;
  background-position: center;
  margin-bottom: 2rem;
}

.under-hero {
  position: relative;
  z-index: 1;
}

.section {
  margin-bottom: 3rem;
}

.card__cover {
  position: relative;
}

.card__cover img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.btn-play {
  position: absolute;
  right: 10px;
  bottom: 10px;
  opacity: 0;
  transition: opacity 0.2s;
}

.card:hover .btn-play,
.list__item:hover .btn-play {
  opacity: 1;
}

.list__item {
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.list__item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.avatar__image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

.artists-section {
  padding: 2rem 0;
}

.artist-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s, background-color 0.2s;
  position: relative;
  overflow: hidden;
}

.artist-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.artist-card__link {
  text-decoration: none;
  color: inherit;
}

.artist-card__image {
  width: 140px;
  height: 140px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.artist-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.artist-card:hover .artist-card__image img {
  transform: scale(1.1);
}

.artist-card__name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist-card__followers {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
}

.artist-card__play {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.3s;
  min-width: 100px;
}

.artist-card:hover .artist-card__play {
  bottom: 1rem;
}

.albums-section {
  padding: 2rem 0;
}

.album-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.album-card:hover {
  transform: translateY(-5px);
}

.album-card__cover {
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
}

.album-card__cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-card:hover .album-card__cover img {
  transform: scale(1.1);
}

.album-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-card:hover .album-card__overlay {
  opacity: 1;
}

.album-card__play {
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(20px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.album-card:hover .album-card__play {
  transform: translateY(0);
}

.album-card__content {
  padding: 1.25rem;
}

.album-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-card__subtitle {
  margin: 0 0 0.75rem;
}

.album-card__artist {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.2s;
}

.album-card__artist:hover {
  color: var(--bs-primary);
}

.album-card__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.album-card__year,
.album-card__tracks {
  display: flex;
  align-items: center;
}

.album-card__year::before {
  content: "📅";
  margin-right: 0.25rem;
}

.album-card__tracks::before {
  content: "🎵";
  margin-right: 0.25rem;
}
.podcasts-section {
  padding: 2rem 0;
}

.podcast-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.podcast-card:hover {
  transform: translateY(-5px);
}

.podcast-card__cover {
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
}

.podcast-card__cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.podcast-card:hover .podcast-card__cover img {
  transform: scale(1.1);
}

.podcast-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.podcast-card:hover .podcast-card__overlay {
  opacity: 1;
}

.podcast-card__status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
}

.podcast-card__play {
  width: 60px;
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(20px);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.podcast-card:hover .podcast-card__play {
  transform: translateY(0);
}

.podcast-card__content {
  padding: 1.25rem;
}

.podcast-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.podcast-card__author {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0 0 0.75rem;
}

.podcast-card__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.podcast-card__episodes,
.podcast-card__language {
  display: flex;
  align-items: center;
}

.podcast-card__episodes::before {
  content: "🎙️";
  margin-right: 0.25rem;
}

.podcast-card__language::before {
  content: "🌐";
  margin-right: 0.25rem;
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
</style>
