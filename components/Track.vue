<template>
  <div class="list__item">
    <div class="list__cover">
      <div class="ratio ratio-1x1">
        <img
          :src="track?.avatar_url || track?.album?.avatar_url || '/images/default-track-avatar.png'"
          alt="track-avatar"
        />
      </div>
      <button
        @click="handleClickPlayTrack"
        class="btn btn-play btn-sm btn-default btn-icon rounded-pill"
      >
        <i class="ri-play-fill icon-play"></i>
        <!-- <i class="ri-pause-fill icon-pause"></i> -->
      </button>
    </div>
    <div class="list__content">
      <NuxtLink :to="`/track/${track.id}`" class="list__title text-truncate">
        {{ track.title }}
      </NuxtLink>
      <p class="list__subtitle text-truncate">
        <NuxtLink :to="`/artist/${track.artist.id}`">
          {{ track.artist.name }}
        </NuxtLink>
      </p>
    </div>
    <ul class="list__option">
      <li>
        <!-- Premium Badge -->
        <span v-if="track?.is_premium" class="badge rounded-pill bg-info">
          <i class="ri-vip-crown-fill"> Premium</i>
        </span>
      </li>
      <li>
        <a
          role="button"
          class="d-inline-flex"
          aria-label="Favorite"
          @click="toggleFavorite"
        >
          <i
            :class="isFavorite ? 'ri-heart-fill' : 'ri-heart-line'"
            :style="isFavorite ? { color: 'red', fontSize: '24px' } : {}"
          ></i>
        </a>
      </li>
      <li>{{ formatDuration(track.duration_ms) }}</li>
      <li class="dropstart d-inline-flex">
        <a
          class="dropdown-link"
          role="button"
          data-bs-toggle="dropdown"
          aria-label="Cover options"
          aria-expanded="false"
          ><i class="ri-more-fill"></i
        ></a>
        <ul class="dropdown-menu dropdown-menu-sm">
          <li>
            <a class="dropdown-item" role="button" data-playlist-id="8"
              >Add to playlist</a
            >
          </li>
          <li>
            <a class="dropdown-item" role="button" data-queue-id="8"
              >Add to queue</a
            >
          </li>
          <li>
            <a class="dropdown-item" role="button" data-next-id="8"
              >Next to play</a
            >
          </li>
          <li>
            <a class="dropdown-item" role="button">Share</a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <button @click="handleClickPlayTrack" class="dropdown-item">
              Play
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";

const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
});

const toast = useToast();
const { $axios } = useNuxtApp();
const player = usePlayerStore();
const isFavorite = ref(props.track?.is_favorite || false);

// Convert milliseconds → mm:ss
const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const handleClickPlayTrack = async () => {
  console.log("Play track: ", props.track);
  console.log("track is_premium: ", props.track.is_premium);
  if (props.track.is_premium) {
    try {
      const res = await $axios.get(`/api/profile/check-premium`);
      if (res.data.is_premium) {
        player.setPlaylist([props.track.id]);
      } else {
        toast.info("Bạn cần tài khoản Premium để phát bài hát này.");
      }
    } catch (error) {
      console.error("Lỗi check-premium:", error);
      toast.error("Lỗi check-premium!" + error);
    }
  } else {
    player.setPlaylist([props.track.id]);
  }
};

const toggleFavorite = async () => {
  try {
    const endpoint = isFavorite.value
      ? "/api/libraries/tracks/remove_saved_track/"
      : "/api/libraries/tracks/save_track/";

    const res = await $axios.post(endpoint, {
      track_id: props.track.id,
    });

    if (res.status === 200 || res.status === 201) {
      isFavorite.value = !isFavorite.value;
      toast.success(
        isFavorite.value ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích"
      );
    }
  } catch (error) {
    console.error("Lỗi toggleFavorite:", error);
    toast.error("Lỗi toggleFavorite:" + error);
  }
};
</script>

<style></style>
