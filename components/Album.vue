<template>
  <div class="list__item">
    <NuxtLink to="/album/1" class="list__cover">
      <div class="ratio ratio-1x1">
        <img src="/images/cover/small/1.jpg" alt="Mummy" />
      </div>
    </NuxtLink>
    <div class="list__content">
      <NuxtLink to="/album/1" class="list__title text-truncate">
        {{ album.title }}
      </NuxtLink>
      <p class="list__subtitle text-truncate">
        <a href="artist-details.html">
          {{ album.artist }}
        </a>
      </p>
    </div>
    <ul class="list__option">
      <!-- <li>
        <span class="badge rounded-pill bg-info">
          <i class="ri-vip-crown-fill"></i>
        </span>
      </li> -->
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
            <a class="dropdown-item" role="button" data-favorite-id="100"
              >Favorite</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="audio/ringtone-1.mp3" download
              >Download</a
            >
          </li>
          <li>
            <a class="dropdown-item" role="button">Share</a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item" href="album-details.html">View details</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  album: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
