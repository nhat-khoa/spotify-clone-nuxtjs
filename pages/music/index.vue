<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/song.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head align-items-center">
        <span class="d-block pe-3 fs-6 fw-semibold"
          >5240 Songs in the list</span
        >
        <div>
          <select class="form-select" aria-label="Filter song">
            <option value="Popular">Popular</option>
            <option value="Most played">Most played</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
          </select>
        </div>
      </div>
      <div class="list">
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
