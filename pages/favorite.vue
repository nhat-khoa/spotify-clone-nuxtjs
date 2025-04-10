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
      <div class="mt-4 text-center">
        <a href="javascript:void(0);" class="btn btn-primary">
          <div class="btn__wrap">
            <i class="ri-loader-3-fill"></i> <span>Load more</span>
          </div>
        </a>
      </div>
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
      <div class="mt-4 text-center">
        <a href="javascript:void(0);" class="btn btn-primary">
          <div class="btn__wrap">
            <i class="ri-loader-3-fill"></i> <span>Load more</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const { $axios } = useNuxtApp();
const toast = useToast();

const tracks = ref([]);
const albums = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    // gọi song song 2 api để tăng tốc độ load
    // sử dụng Promise.all để thực hiện song song 2 api
    const [trackRes, albumRes] = await Promise.all([
      $axios.get("/api/favorites/tracks/"),
      $axios.get("/api/favorites/albums/"),
    ]);

    tracks.value = trackRes.data.results.map((item) => item.track);
    albums.value = albumRes.data.results.map((item) => item.album);
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu", error);
    toast.error("Lỗi khi fetch dữ liệu");
  } finally {
    loading.value = false;
  }
});
</script>

<style></style>
