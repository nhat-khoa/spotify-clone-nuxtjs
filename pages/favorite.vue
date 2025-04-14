<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/song.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Tracks</h3>
      </div>
      <div class="list list--order">
        <div v-if="loading">Đang tải...</div>
        <div v-else>
          <div class="row">
            <div v-for="track in tracks" :key="track.id" class="col-xl-6">
              <Track :track="track" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-4 text-center">
        <a href="javascript:void(0);" class="btn btn-primary">
          <div class="btn__wrap">
            <i class="ri-loader-3-fill"></i> <span>Load more</span>
          </div>
        </a>
      </div> -->
    </div>
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Albums</h3>
      </div>
      <div class="list list--lg">
        <div v-if="loading">Đang tải...</div>
        <div v-else>
          <div class="row">
            <div v-for="album in albums" :key="album.id" class="col-xl-6">
              <Album :album="album" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-4 text-center">
        <a href="javascript:void(0);" class="btn btn-primary">
          <div class="btn__wrap">
            <i class="ri-loader-3-fill"></i> <span>Load more</span>
          </div>
        </a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default2",
});

import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const { $axios } = useNuxtApp();
const toast = useToast();

const tracks = ref([]);
const albums = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await $axios.get("/api/libraries/get_library/");
    console.log("response: ", response);
    const savedTrack = response.data.saved_tracks;
    const savedAlbum = response.data.saved_albums;
    tracks.value = savedTrack.map((item) => item);
    albums.value = savedAlbum.map((item) => item);
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu", error);
    toast.error("Lỗi khi fetch dữ liệu");
  } finally {
    loading.value = false;
  }
});
</script>

<style></style>
