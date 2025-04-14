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
              <h4 class="mb-3">Free <span class="text-primary">Trial</span></h4>
              <p class="fs-6">
                Your <b>Free Trial</b> subscription plan will terminate in 10
                days, kindly select your plan.
              </p>
            </div>
            <div class="px-3 text-center mt-auto">
              <img src="/images/misc/plan.png" class="img-fluid" alt="" />
            </div>
          </div>
        </div>
        <div class="plan__data">
          <div class="card plan__col">
            <div class="card-body fw-medium">
              <div class="d-flex align-items-center text-dark mb-4">
                <i class="ri-music-2-line fs-3"></i>
                <h4 class="mb-0 ps-3">
                  Ads <span class="text-primary">free</span>
                </h4>
              </div>
              <p class="fs-6 opacity-50">What you'll get</p>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2"
                  >Access all free tracks and app features</span
                >
              </div>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2">No Ads between tracks</span>
              </div>
            </div>
            <div class="card-footer pb-4 pb-sm-0">
              <div class="text-dark mb-3">
                <span class="fs-4 fw-bold">$10.99</span>/year
              </div>
              <button type="button" class="btn btn-primary w-100">
                Choose
              </button>
            </div>
          </div>
          <div class="card plan__col">
            <div class="card-body fw-medium">
              <div class="d-flex align-items-center text-dark mb-4">
                <i class="ri-vip-crown-line fs-3"></i>
                <h4 class="mb-0 ps-3">Premium</h4>
              </div>
              <p class="fs-6 opacity-50">What you'll get</p>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2"
                  >Access all free tracks and app features</span
                >
              </div>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2">No Ads between tracks</span>
              </div>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2">Create playlist & access analytics</span>
              </div>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2">Listen paid track once & purchase</span>
              </div>
              <div class="d-flex mb-3">
                <i
                  class="ri-checkbox-circle-fill text-primary opacity-75 fs-6"
                ></i>
                <span class="ps-2">Download and listen offline</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="text-dark mb-3">
                <span class="fs-4 fw-bold">$99.99</span>/year
              </div>
              <button type="button" class="btn btn-primary w-100">
                Choose
              </button>
            </div>
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
