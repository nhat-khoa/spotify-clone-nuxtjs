<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/artists.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Top <span class="text-primary">Artists</span></h3>
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
            <TopArtist />
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Other <span class="text-primary">Artists</span></h3>
      </div>
      <div class="row">
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
        <div class="col-xl-2 mb-3">
          <Artist />
        </div>
      </div>
      <div class="mt-5 text-center">
        <a href="javascript:void(0);" class="btn btn-primary">
          <div class="btn__wrap">
            <i class="ri-loader-3-fill"></i> <span>Load more</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
