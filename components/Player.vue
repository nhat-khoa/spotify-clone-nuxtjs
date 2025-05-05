<template>
  <div id="player" v-show="player.isVisible">
    <div class="container">
      <div class="player-container">
        <!-- Progress -->
        <div class="player-progress">
          <progress
            class="player-progress__bar"
            :value="progress"
            max="100"
          ></progress>
          <input
            type="range"
            class="player-progress__slider"
            :value="progress"
            @input="onSeek"
            aria-label="Progress slider"
          />
        </div>

        <!-- Cover + Info -->
        <div class="cover d-flex align-items-center">
          <div class="cover__image">
            <div class="ratio ratio-1x1">
              <img
                v-if="player.currentItem?.type == 'podcast_episode'"
                :src="
                  player.currentItem?.cover_art_image_url ||
                  player.currentItem?.podcast?.cover_art_image_url ||
                   '/images/default-podcast-avatar.png'
                "
                alt="podcast-avatar"
              />

              <img
                v-else
                :src="
                  player.currentItem?.avatar_url || player.currentItem?.album?.avatar_url || '/images/default-track-avatar.png'
                "
                alt="track-avatar"
              />
            </div>
          </div>
          <div class="cover__content ps-3 d-none d-sm-block">
            <a class="cover__title text-truncate">{{
              player.currentItem?.title || "No song"
            }}</a>

            <a v-if="player.currentItem?.type == 'podcast_episode'" class="cover__subtitle text-truncate">
              {{ player.currentItem?.podcast?.podcaster?.name || "Unknown" }}
            </a>
            <a v-else class="cover__subtitle text-truncate">
              {{ player.currentItem?.artist?.name || "Unknown" }}
            </a>
          </div>
        </div>

        <!-- Control -->
        <div class="player-control">
          <button
            type="button"
            class="btn btn-icon me-4 d-none d-md-block"
            :class="{ 'text-success': player.repeatMode > 0 }"
            aria-label="Repeat"
            @click="player.toggleRepeat"
          >
            <i 
              :class="[
                player.repeatMode === 2 ? 'ri-repeat-one-fill' : 'ri-repeat-2-fill',
                'fs-5'
              ]"
            ></i>
          </button>

          <button
            type="button"
            class="btn btn-icon"
            aria-label="Prev"
            @click="player.playPrev"
          >
            <i class="ri-skip-back-mini-fill"></i>
          </button>

          <button
            type="button"
            class="btn btn-icon btn-default rounded-pill"
            aria-label="Play pause"
            @click="player.playPause"
          >
            <i v-if="!player.isPlaying" class="ri-play-fill icon-play"></i>
            <i v-else class="ri-pause-fill icon-pause"></i>
          </button>

          <button
            type="button"
            class="btn btn-icon"
            aria-label="Next"
            @click="player.playNext"
          >
            <i class="ri-skip-forward-mini-fill"></i>
          </button>

          <button
            type="button"
            class="btn btn-icon ms-4 d-none d-md-block"
            :class="{ 'text-success': player.isShuffled }"
            aria-label="Shuffle"
            @click="player.toggleShuffle"
          >
            <i class="ri-shuffle-fill fs-5"></i>
          </button>
        </div>

        <!-- Time + Volume -->
        <div class="player-info">
          <div class="me-4 d-none d-xl-block">
            <span>{{ formatTime(currentTime) }}</span> /
            <span>{{ formatTime(duration) }}</span>
          </div>

          <div class="player-volume dropdown d-none d-md-block">
            <button
              class="btn btn-icon"
              data-bs-toggle="dropdown"
              aria-label="Volume"
            >
              <i class="ri-volume-up-fill fs-5"></i>
            </button>
            <div class="dropdown-menu prevent-click">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                :value="player.audio?.volume || 0"
                @input="player.setVolume($event.target.value)"
                class="volume-slider-vertical"
              />
            </div>
          </div>
          <div class="dropstart d-none d-md-block">
            <button
              class="btn btn-icon"
              data-bs-toggle="dropdown"
              aria-label="Song options"
              aria-expanded="false"
            >
              <i class="ri-more-2-fill fs-5"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-sm" id="player_options">
              <li>
                <a class="dropdown-item" role="button" data-favorite-id="1"
                  >Favorite</a
                >
              </li>
              <li>
                <a class="dropdown-item" role="button" data-playlist-id="1"
                  >Add to playlist</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="audio/ringtone-1.mp3" download
                  >Download</a
                >
              </li>
              <li><a class="dropdown-item" role="button">Share</a></li>
              <li class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" href="song-details.html"
                  >View details</a
                >
              </li>
            </ul>
          </div>
          <div class="playlist dropstart me-3">
            <button
              class="btn btn-icon"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-label="Playlist"
              aria-expanded="false"
            >
              <i class="ri-play-list-fill fs-5"></i>
            </button>
            <div class="dropdown-menu playlist__dropdown">
              <div
                class="playlist__head d-flex align-items-center justify-content-between"
              >
                <h6 class="mb-0">Queue</h6>
              </div>
              <div id="playlist" class="list playlist__body" data-scroll="true">
                <div
                  v-if="listTracks.length === 0"
                  class="col-sm-8 col-10 mx-auto mt-5 text-center"
                >
                  <i class="ri-music-2-line mb-3"></i>
                  <p>No songs, album or playlist are added on lineup.</p>
                </div>
                <!-- Bọc ngoài đoạn v-for bằng div cuộn -->
                <div
                  class="track-list-wrapper overflow-auto"
                  style="max-height: 416px"
                >
                  <div
                    v-for="(item, index) in listTracks"
                    :key="index"
                    class="d-flex align-items-center justify-content-between py-2 px-3 border-bottom track-item"
                    :class="{ 'bg-light': player.currentIndex === index }"
                    @click="player.playTrackByIndex(index)"
                    style="cursor: pointer"
                  >
                    <div class="d-flex align-items-center">
                      <img
                      v-if="item.type == 'podcast_episode'"
                        :src="
                          item?.cover_art_image_url || item?.podcast.cover_art_image_url ||
                          '/images/default-track-avatar.png'
                        "
                        alt="cover"
                        class="rounded me-2"
                        style="width: 40px; height: 40px; object-fit: cover"
                      />
                      <img
                      v-else
                        :src="
                          item?.avatar_url || item?.album.avatar_url ||
                          '/images/default-track-avatar.png'
                        "
                        alt="cover"
                        class="rounded me-2"
                        style="width: 40px; height: 40px; object-fit: cover"
                      />
                      <div>
                        <p class="mb-0 fw-bold">
                          {{ item.title }}
                          <i
                            v-if="player.currentIndex === index"
                            class="ri-volume-up-fill text-primary ms-2"
                          ></i>
                        </p>
                        <small v-if="item.type == 'podcast_episode'"  class="text-muted">{{
                          item.podcast?.podcaster?.name
                        }}</small>

                        <small v-else class="text-muted">{{
                          item.artist.name
                        }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { usePlayerStore } from "@/stores/player";

const player = usePlayerStore();
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const listTracks = ref([]);

function formatTime(seconds) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function onSeek(e) {
  const percent = e.target.value;
  if (player.audio) {
    player.audio.currentTime = (player.audio.duration * percent) / 100;
  }
}

// Cập nhật thời gian và thanh progress mỗi khi audio phát
watch(
  () => player.audio,
  (audio) => {
    if (audio) {
      audio.ontimeupdate = () => {
        currentTime.value = audio.currentTime || 0;
        duration.value = audio.duration || 0;
        progress.value = duration.value
          ? (audio.currentTime / audio.duration) * 100
          : 0;
      };
    }
  },
  { immediate: true }
);

const fetchTrackById = async (item) => {
  const { $axios } = useNuxtApp();
  if (!item) return null;
  const id = item.id;

  try {
    if (item.type == "track") {
      const res = await $axios.get(`/api/tracks/${id}`);
      const data = res.data;
      data.type = "track";
      return data;
    }
    else if (item.type == "podcast_episode") {
      const res = await $axios.get(`/api/podcasts/get_episode_details/?episode_id=${id}`);
      const data = res.data;
      data.type = "podcast_episode";
      return data;
    }
  } catch (error) {
    console.error("Lỗi fetch track:", error);
    return null;
  }
}; 

async function loadlistTracks() {
  const items = player.getQueue()
  const results = await Promise.all(items.map(fetchTrackById));
  listTracks.value = results.filter(Boolean); // bỏ track null nếu lỗi
}

// Tự load khi mounted hoặc khi playlist/index thay đổi
onMounted(loadlistTracks);
watch([() => player.currentIndex,
 () => player.queue,
 () => player.addedQueue], 
 loadlistTracks);
</script>

<style scoped>
.volume-slider-vertical {
  writing-mode: bt-lr; /* bottom to top, left to right */
  -webkit-appearance: slider-vertical; /* for some older browsers */
  width: 40px;
  height: 100px;
}
</style>
