<template>
  <div class="list__item">
    <NuxtLink to="/album/1" class="list__cover">
      <div class="ratio ratio-1x1">
        <img src="/images/cover/small/1.jpg" alt="Mummy" />

        <img
          :src="album?.avatar_url || '/images/default-album.jpg'"
          alt="Mummy"
        />
      </div>
    </NuxtLink>
    <div class="list__content">
      <NuxtLink to="/album/1" class="list__title text-truncate">
        {{ album.title }}
        <span class="text-white ms-1">
          ({{ album.tracks?.length || 0 }} Track )
        </span>
      </NuxtLink>
      <p class="list__subtitle text-truncate">
        <a href="artist-details.html">
          {{ album.artist.name }}
        </a>
      </p>
    </div>
    <ul class="list__option">
      <li>
        <!-- Premium Badge -->
        <span v-if="album?.is_premium" class="badge rounded-pill bg-info">
          <i class="ri-vip-crown-fill"> Premium</i>
        </span>
      </li>
      <li>
        <a
          role="button"
          class="d-inline-flex"
          aria-label="Favorite"
          data-favorite-id="100"
        >
          <i class="ri-heart-fill" style="color: red; font-size: 24px"></i>
        </a>
      </li>
      <li class="dropstart d-inline-flex">
        <a
          class="dropdown-link"
          role="button"
          data-bs-toggle="dropdown"
          aria-label="Cover options"
          aria-expanded="false"
        >
          <i class="ri-more-fill"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-sm">
          <li>
            <a class="dropdown-item" role="button" data-favorite-id="100">
              Favorite
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="audio/ringtone-1.mp3" download>
              Download
            </a>
          </li>
          <li>
            <a class="dropdown-item" role="button">Share</a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <button @click="handleClickPlayAlbum" class="dropdown-item">
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
  album: {
    type: Object,
    required: true,
  },
});

const $axios = useNuxtApp().$axios;
const player = usePlayerStore();
const toast = useToast();

const handleClickPlayAlbum = async () => {
  console.log("Play album: ", props.album);
  console.log("album is_premium: ", props.album.is_premium);
  console.log("album tracks: ", props.album.tracks);
  if (props.album.is_premium) {
    try {
      const res = await $axios.get(`/api/profile/check-premium`);
      if (res.data.is_premium) {
        player.setPlaylist(props.album.tracks.slice());
      } else {
        toast.info("Bạn cần tài khoản Premium để phát bài hát này.");
      }
    } catch (error) {
      console.error("Lỗi check-premium:", error);
      toast.error("Lỗi check-premium!" + error);
    }
  } else {
    player.setPlaylist(props.album.tracks.slice());
  }
};
</script>

<style></style>
