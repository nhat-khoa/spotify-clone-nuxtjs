<template>
  <aside id="sidebar">
    <div class="sidebar-head d-flex align-items-center justify-content-between">
      <a href="index.html" class="brand external"
        ><img src="/images/logos/logo.svg" alt="Listen app" /> </a
      ><a role="button" class="sidebar-toggler" aria-label="Sidebar toggler">
        <div class="d-none d-lg-block">
          <i class="ri-menu-3-line sidebar-menu-1"></i>
          <i class="ri-menu-line sidebar-menu-2"></i>
        </div>
        <i class="ri-menu-fold-line d-lg-none"></i>
      </a>
    </div>
    <div class="sidebar-body" data-scroll="true">
      <nav class="navbar d-block p-0">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink
              replace
              to="/home"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-home-4-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.home") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/music"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-music-2-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.music") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/album"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-album-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.album") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/artist"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-mic-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.artists") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/genre"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-disc-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.genres") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item nav-item--head">
            <span class="nav-item--head__text">{{
              $t("sidebar.myAccount")
            }}</span>
            <span class="nav-item--head__dots">...</span>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/profile"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-user-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.profile") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/favorite"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-heart-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.favorites") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/history"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-history-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.history") }}</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink
              replace
              to="/premium"
              class="nav-link d-flex align-items-center"
              exact-active-class="active"
            >
              <i class="ri-vip-crown-line fs-5"></i>
              <span class="ps-3">{{ $t("sidebar.premium") }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="sidebar-foot">
      <button class="btn btn-danger w-100" @click="logout">
        <div class="btn__wrap">
          <i class="ri-logout-box-line"></i>
          <span class="ms-2">{{ $t("sidebar.logout") }}</span>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup>
import Cookies from "js-cookie";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const logout = () => {
  Cookies.remove("access_token"); // Xóa token khỏi cookie
  userStore.logout();
  navigateTo("/login"); // Chuyển hướng về login
};
</script>
