<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/home.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head mt-5">
        <div class="flex-grow-1">
          <span class="section__subtitle">Chỉ hiển thị với bạn</span>
          <h3 class="mb-0">
            Bài hát <span class="text-primary">đã nghe</span>
          </h3>
        </div>
        <a href="albums.html" class="btn btn-link">View All</a>
      </div>
      <div class="list list--lg list--order">
        <div class="row">
          <div class="col-xl-6" v-for="track in tracks" :key="track.id">
            <Track :track="track" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default2",
});
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { useToast } from "vue-toastification";
const userStore = useUserStore();
const user = userStore.user;
console.log(user.access_token);

// const avatar = ref(null);
// const previewUrl = ref(null);
// const toast = useToast();
const { $axios } = useNuxtApp();
import Track from "~/components/Track.vue";
// import MyPlaylistCard from "@/components/MyPlaylistCard.vue";
// import Artist from "~/components/Artist.vue";

const tracks = ref([]);

onMounted(async () => {
  try {
    const res = await $axios.get(
      "http://127.0.0.1:8000/api/tracks/get_tracks_from_history/",
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );
    tracks.value = res.data;
  } catch (error) {
    console.error("Lỗi khi fetch tracks:", error);
  }
});
</script>

<style></style>
