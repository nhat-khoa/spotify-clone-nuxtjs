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

          <!-- show synced lyrics -->
          <div class=" d-none d-md-block">
            <button
              class="btn btn-icon"
              @click="showLyrics"
              v-if="player.currentItem?.type === 'track'"
            >
              <i class="ri-quote-text fs-5"></i>
            </button>
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
                <a v-if="userStore.user.premium_expired !== null && new Date(userStore.user.premium_expired) > new Date()"  class="dropdown-item" href="audio/ringtone-1.mp3" download
                  >Download</a
                >
              </li>
              <li><a class="dropdown-item" role="button" @click="shareItem">Share</a></li>
              <li class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" role="button" @click="showCredits"
                  >View credit</a
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

  <!-- Track Credits Dialog -->
  <div class="modal fade" id="trackCreditsModal" tabindex="-1" aria-labelledby="trackCreditsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-bottom border-secondary">
          <h5 class="modal-title" id="trackCreditsModalLabel">Track Credits</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="trackCredits">
            <div class="mb-4" v-for="(role, index) in Object.keys(trackCredits)" :key="index">
              <h6 class="text-muted mb-2">{{ role }}</h6>
              <div v-for="artist in trackCredits[role]" :key="artist.id" class="d-flex align-items-center mb-2">
                <span>{{ artist.name }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-muted">No credits information available</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Synced Lyrics Modal -->
  <div class="modal fade" id="lyricsModal" tabindex="-1" aria-labelledby="lyricsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header border-bottom border-secondary">
          <h5 class="modal-title" id="lyricsModalLabel">Lyrics</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="height: 70vh; overflow-y: auto;">
          <div v-if="parsedLyrics.length > 0" class="lyrics-container">
            <div 
              v-for="(line, index) in parsedLyrics" 
              :key="index"
              class="lyrics-line mb-4 text-center"
              :class="{ 'text-success': currentLineIndex === index }"
            >
              <span class="fs-5 cursor-pointer  " @click="onSeek({
                target: {
                  value: Math.round((line.time / duration) * 100)
                }
              })">{{ line.text }}</span>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-muted">No lyrics available</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { usePlayerStore } from "@/stores/player";
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toastification";
const { $axios } = useNuxtApp();

const toast = useToast();
const userStore = useUserStore();
const player = usePlayerStore();
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const listTracks = ref([]);
const trackCredits = ref(null);
const parsedLyrics = ref([]);
const currentLineIndex = ref(0);

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

const showCredits = async () => {
  try {
    const response = await $axios.get(
      `/api/tracks/${player.currentItem.id}/get_track_artists`
    );
    trackCredits.value = response.data;
    // Use Bootstrap's modal API to show the dialog
    const modal = new bootstrap.Modal(document.getElementById('trackCreditsModal'));
    modal.show();
  } catch (error) {
    console.error('Error fetching track credits:', error);
  }
};

const shareItem = async () => {
  try {
    let shareUrl = '';
    if (player.currentItem?.type === 'track') {
      shareUrl = `${window.location.origin}/track/${player.currentItem.id}`;
    } else if (player.currentItem?.type === 'podcast_episode') {
      shareUrl = `${window.location.origin}/episode/${player.currentItem.id}`;
    }

    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Đã sao chép liên kết!", {
        timeout: 1500,
        position: "bottom-center",
        pauseOnHover: false,
        hideProgressBar: true,
        icon: true,
      });
    }
  } catch (error) {
    console.error("Error sharing:", error);
    toast.error("Không thể sao chép liên kết");
  }
};

// Parse lyrics string into array of {time, text} objects
const parseLyrics = (lyricsString) => {
  if (!lyricsString) return [];
  
  return lyricsString.split('\n')
    .map(line => {
      const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseFloat(match[2]);
        const timeInSeconds = minutes * 60 + seconds;
        return {
          time: timeInSeconds,
          text: match[3].trim()
        };
      }
      return null;
    })
    .filter(Boolean); // Remove null entries
};

const showLyrics = () => {
  if (player.currentItem?.synced_lyrics != null) {
    parsedLyrics.value = parseLyrics(player.currentItem.synced_lyrics);
    const lyricsModal = new bootstrap.Modal(document.getElementById('lyricsModal'));
    lyricsModal.show();
  }
};


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
        
        for (let i = 0; i < parsedLyrics.value?.length; i++) {
          if (currentTime.value < parsedLyrics.value[i].time) {
            currentLineIndex.value = i - 1;
            break;
          }
        }
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

.lyrics-container {
  padding: 2rem 1rem;
}

.lyrics-line {
  transition: color 0.3s ease;
  opacity: 0.7;
}

.lyrics-line.text-success {
  opacity: 1;
  font-weight: 500;
}
</style>
