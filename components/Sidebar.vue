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
      <NuxtLink to="/login" class="btn btn-danger d-flex">
        <div class="btn__wrap">
          <i class="ri-logout-box-line"></i>
          <span class="ms-2">{{ $t("sidebar.logout") }}</span>
        </div>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
// const { locale } = useI18n();

// // Khôi phục locale từ localStorage khi component mounted
// onMounted(() => {
//   const savedLocale = localStorage.getItem("user-locale");
//   if (savedLocale) {
//     locale.value = savedLocale;
//   }
// });
</script>
