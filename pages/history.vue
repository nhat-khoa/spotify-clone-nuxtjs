<template>
  <div
    class="hero"
    style="background-image: url(/images/banner/home.jpg)"
  ></div>
  <div class="under-hero container">
    <div class="section">
      <div class="section__head">
        <div class="flex-grow-1">
          <span class="section__subtitle">Recently listened</span>
          <h3 class="mb-0">History</h3>
        </div>
        <a href="#" class="btn btn-link">Clear All</a>
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
          <div class="col-xl-6">
            <Music />
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
