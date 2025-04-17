<template>
  <div class="auth py-5">
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-7 col-md-9 col-sm-11 mx-auto">
          <div class="card">
            <div class="card-body p-sm-5">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <h4 class="mb-0">
                  Register with <span class="text-primary">Listen</span>
                </h4>
              </div>
              <p class="fs-6">
                It's time to join with Listen and gain full awesome music
                experience.
              </p>
              <form action="#" class="mt-3">
                <div class="mb-3">
                  <label for="email" class="form-label fw-medium">Email</label>
                  <input type="text" id="email" class="form-control" />
                </div>
                <div class="mb-2">
                  <label for="password" class="form-label fw-medium"
                    >Password</label
                  >
                  <input type="password" id="password" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="c_password" class="form-label fw-medium"
                    >Confirm Password</label
                  >
                  <input type="password" id="c_password" class="form-control" />
                </div>
                <div class="mb-4">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="agree"
                    />
                    <label class="form-check-label" for="agree"
                      >I agree <a href="#">Terms & Condition</a></label
                    >
                  </div>
                </div>
                <div class="mb-5">
                  <input
                    type="submit"
                    class="btn btn-primary w-100"
                    value="Login"
                  />
                </div>
                <p>
                  Do you have an Account?<br />
                  <NuxtLink to="/login" class="fw-medium external">
                    Login
                  </NuxtLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  guest: true,
});
</script>

<style></style>
