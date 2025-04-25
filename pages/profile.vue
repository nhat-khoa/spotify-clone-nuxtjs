<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/event.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="plan bg-light">
        <div class="card plan__info overflow-hidden">
          <div class="card-body d-flex flex-column p-0">
            <div class="p-4">
              <h4 class="mb-3">
                Selected <span class="text-primary">Plan</span>
              </h4>
              <p class="fs-6">
                Your current subscription plan will terminate in <b>10 days</b>,
                kindly select your plan.
              </p>
              <a href="plan.html" class="d-inline-flex align-items-center"
                ><span class="fw-semibold pe-1">Choose plan</span>
                <i class="ri-arrow-right-line ltr fs-6"></i>
                <i class="ri-arrow-left-line rtl fs-6"></i
              ></a>
            </div>
            <div class="px-3 text-center mt-auto">
              <img src="/images/misc/plan.png" class="img-fluid" alt="" />
            </div>
          </div>
        </div>
        <div class="plan__data">
          <div class="px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100">
            <div class="d-flex align-items-center mb-4">
              <div class="avatar avatar--xl">
                <div class="avatar__image">
                  <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    alt="Avatar preview"
                  />
                  <img
                    v-else-if="user.avatar_url"
                    :src="`http://localhost:8000${user.avatar_url}`"
                    alt="Avatar"
                  />
                  <img
                    v-else-if="user.avatar_google_url"
                    :src="user.avatar_google_url"
                    alt="Avatar from Google"
                  />
                </div>
              </div>
              <div class="ps-3">
                <input
                  type="file"
                  id="profile"
                  class="d-none"
                  @change="handleFileChange"
                />
                <label for="profile" class="btn btn-white rounded-pill"
                  >Change image</label
                >
              </div>
            </div>
            <div class="row g-4">
              <div class="col-sm-6">
                <label for="f_name" class="form-label fw-medium"
                  >Full name</label
                >
                <input
                  type="text"
                  id="d_name"
                  class="form-control"
                  v-model="user.full_name"
                />
              </div>
              <div class="col-sm-6">
                <label for="country" class="form-label fw-medium"
                  >Country</label
                >
                <input
                  type="text"
                  id="country"
                  class="form-control"
                  v-model="user.country"
                />
              </div>
              <div class="col-sm-6">
                <label for="email" class="form-label fw-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  v-model="user.email"
                  readonly
                />
              </div>
              <div class="col-sm-6">
                <label for="gender" class="form-label fw-medium">Gender</label>
                <select id="gender" class="form-control" v-model="user.gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="phone" class="form-label fw-medium">Phone</label>
                <input
                  type="text"
                  id="phone"
                  class="form-control"
                  v-model="user.phone"
                />
              </div>
              <div class="col-sm-6">
                <label for="age" class="form-label fw-medium">Age</label>
                <input
                  type="number"
                  id="age"
                  class="form-control"
                  v-model="user.age"
                />
              </div>
              <div class="col-sm-6">
                <label for="dob" class="form-label fw-medium"
                  >Date of Birth</label
                >
                <input
                  type="date"
                  id="dob"
                  class="form-control"
                  v-model="user.date_of_birth"
                />
              </div>
              <div class="col-sm-6">
                <label for="subscription_type" class="form-label fw-medium"
                  >Subscription Type</label
                >
                <select
                  id="subscription_type"
                  class="form-control"
                  v-model="user.subscription_type"
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div class="col-12">
                <label for="description" class="form-label fw-medium"
                  >Description</label
                >
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                  class="form-control"
                  v-model="user.description"
                ></textarea>
              </div>
              <div class="col-12">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="handleSubmit"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section__head mt-5">
        <div class="flex-grow-1">
          <span class="section__subtitle">Chỉ hiển thị với bạn</span>
          <h3 class="mb-0">
            Top <span class="text-primary">Bản nhạc hàng đầu</span>
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

      <div class="section__head mt-5">
        <div class="flex-grow-1">
          <span class="section__subtitle"></span>
          <h3 class="mb-0">Playlist Công Khai</h3>
        </div>
        <a href="albums.html" class="btn btn-link">View All</a>
      </div>
      <div class="container">
        <div class="row g-4">
          <div
            class="col-6 col-md-4 col-lg-3"
            v-for="playlist in myPublicPlaylists"
            :key="playlist.id"
          >
            <MyPlaylistCard :playlist="playlist" />
          </div>
        </div>
      </div>

      <div class="section__head mt-5">
        <div class="flex-grow-1">
          <span class="section__subtitle"></span>
          <h3 class="mb-0">Đang theo dõi</h3>
        </div>
        <a href="albums.html" class="btn btn-link">View All</a>
      </div>
      <div class="container">
        <div class="row g-4">
          <div
            class="col-6 col-md-4 col-lg-3"
            v-for="artist in followedArtists"
            :key="artist.id"
          >
            <Artist :artist="artist" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { useToast } from "vue-toastification";

definePageMeta({
  layout: "default2",
});

const userStore = useUserStore();
const user = userStore.user;
const avatar = ref(null);
const previewUrl = ref(null);
const toast = useToast();
const { $axios } = useNuxtApp();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = file;
    previewUrl.value = URL.createObjectURL(file); // hiển thị ảnh preview ngay
  }
};

const handleSubmit = async () => {
  const formData = new FormData();

  if (avatar.value) {
    formData.append("avatar_url", avatar.value);
  }

  formData.append("full_name", user.full_name || "");
  formData.append("description", user.description || "");
  formData.append("country", user.country || "");
  formData.append("gender", user.gender || "");
  formData.append("phone", user.phone || "");
  formData.append("age", user.age || "");
  formData.append("date_of_birth", user.date_of_birth || "");
  formData.append("subscription_type", user.subscription_type || "");

  try {
    const res = await $axios.put("/api/profile/", formData, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        "Content-Type": "multipart/form-data", // giúp Django hiểu đây là upload file
      },
    });

    userStore.setUser({
      ...user,
      ...res.data,
    });

    toast.success("Cập nhật thành công!");
  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    toast.error("Cập nhật thất bại!");
    if (err.response?.data) {
      console.log("Chi tiết lỗi:", err.response.data);
    }
  }
};

import axios from "axios";
import Track from "~/components/Track.vue";
import MyPlaylistCard from "@/components/MyPlaylistCard.vue";
import Artist from "~/components/Artist.vue";

const tracks = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/tracks/");
    tracks.value = response.data.results;
  } catch (error) {
    console.error("Lỗi khi lấy tracks:", error);
  }
});

const myPublicPlaylists = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/libraries/playlists/my-public-playlists/",
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );
    myPublicPlaylists.value = res.data;
  } catch (error) {
    console.error("Lỗi khi lấy public playlists:", error);
  }
});

const followedArtists = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/libraries/artists/my-followed",
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );
    followedArtists.value = res.data;
  } catch (error) {
    console.error("Lỗi khi lấy artist followed:", error);
  }
});
// console.log(user.access_token);
</script>

<style></style>
