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
              <h4 class="mb-3">
                Selected <span class="text-primary">Plan</span>
              </h4>
              <p class="fs-6">
                Your current subscription plan will terminate in <b>10 days</b>,
                kindly select your plan.
              </p>
              <a href="plan.html" class="d-inline-flex align-items-center"
                ><span class="fw-semibold pe-1">Choose plan</span>
                <i class="ri-arrow-right-line ltr fs-6"></i>
                <i class="ri-arrow-left-line rtl fs-6"></i
              ></a>
            </div>
            <div class="px-3 text-center mt-auto">
              <img src="/images/misc/plan.png" class="img-fluid" alt="" />
            </div>
          </div>
        </div>
        <div class="plan__data">
          <div class="px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100">
            <div class="d-flex align-items-center mb-4">
              <div class="avatar avatar--xl">
                <div class="avatar__image">
                  <img src="/images/users/thumb.jpg" alt="user" />
                </div>
              </div>
              <div class="ps-3">
                <input type="file" id="profile" class="d-none" />
                <label for="profile" class="btn btn-white rounded-pill"
                  >Change image</label
                >
              </div>
            </div>
            <div class="row g-4">
              <div class="col-sm-6">
                <label for="f_name" class="form-label fw-medium"
                  >First name</label
                >
                <input
                  type="text"
                  id="f_name"
                  class="form-control"
                  value="Androws"
                />
              </div>
              <div class="col-sm-6">
                <label for="l_name" class="form-label fw-medium"
                  >Last name</label
                >
                <input
                  type="text"
                  id="l_name"
                  class="form-control"
                  value="Kinny"
                />
              </div>
              <div class="col-sm-6">
                <label for="d_name" class="form-label fw-medium"
                  >Display name</label
                >
                <input
                  type="text"
                  id="d_name"
                  class="form-control"
                  value="Androws Kinny"
                />
              </div>
              <div class="col-sm-6">
                <label for="location" class="form-label fw-medium"
                  >Location</label
                >
                <input
                  type="text"
                  id="location"
                  class="form-control"
                  value="Australia"
                />
              </div>
              <div class="col-12">
                <label for="about" class="form-label fw-medium">About</label>
                <textarea
                  name="about"
                  id="about"
                  cols="30"
                  rows="5"
                  class="form-control"
                >
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero aspernatur veniam eum distinctio repudiandae. Nihil cum quas dolores. Beatae odio temporibus quisquam quae! Possimus repellat sapiente incidunt.</textarea
                >
              </div>
              <div class="col-12">
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
