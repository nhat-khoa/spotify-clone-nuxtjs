<template>
  <div class="list__item">
    <div class="list__cover">
      <div class="ratio ratio-1x1">
        <img src="/images/cover/small/8.jpg" alt="Hey not me" />
      </div>
      <a
        href="javascript:void(0);"
        class="btn btn-play btn-sm btn-default btn-icon rounded-pill"
        data-play-id="8"
        aria-label="Play pause"
      >
        <i class="ri-play-fill icon-play"></i>
        <i class="ri-pause-fill icon-pause"></i>
      </a>
    </div>
    <div class="list__content">
      <NuxtLink to="/music/1" class="list__title text-truncate">
        Sadness inside
      </NuxtLink>
      <p class="list__subtitle text-truncate">
        <NuxtLink to="/artist/1"> Karen Jennings </NuxtLink>
      </p>
    </div>
    <ul class="list__option">
      <li>
        <span class="badge rounded-pill bg-info"
          ><i class="ri-vip-crown-fill"></i
        ></span>
      </li>
      <li>
        <a
          role="button"
          class="d-inline-flex"
          aria-label="Favorite"
          data-favorite-id="8"
          ><i class="ri-heart-line heart-empty"></i>
          <i class="ri-heart-fill heart-fill"></i
        ></a>
      </li>
      <li>02:37</li>
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
            <a class="dropdown-item" role="button" data-play-id="8">Play</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style></style>
