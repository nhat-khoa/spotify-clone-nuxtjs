<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/home.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Trending to listen</span>
          <h3 class="mb-0">Top <span class="text-primary">Musics</span></h3>
        </div>
        <a href="albums.html" class="btn btn-link">View All</a>
      </div>
      <div class="list list--lg list--order">
        <div class="row">
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
          <div class="col-xl-6">
            <Music />
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Best to listen</span>
          <h3 class="mb-0">Top <span class="text-primary">Artists</span></h3>
        </div>
        <a href="artists.html" class="btn btn-link">View All</a>
      </div>
      <div class="swiper-carousel swiper-carousel-button">
        <div class="swiper" data-swiper-slides="6" data-swiper-autoplay="true">
          <div class="swiper-wrapper">
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
            <TopArtist />
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Trending to listen</span>
          <h3 class="mb-0">Top <span class="text-primary">Albums</span></h3>
        </div>
        <a href="albums.html" class="btn btn-link">View All</a>
      </div>
      <div class="list list--lg list--order">
        <div class="row">
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
          <div class="col-xl-6">
            <Album />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'default2'
})

</script>

<style></style>
