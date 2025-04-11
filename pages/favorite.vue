<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/song.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head">
        <h3 class="mb-0">Musics</h3>
      </div>
      <div class="list list--order">
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
definePageMeta({
  layout: 'default2'
})

</script>

<style></style>
