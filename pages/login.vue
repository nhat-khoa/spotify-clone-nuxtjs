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
                  Login to <span class="text-primary">Listen</span>
                </h4>
              </div>
              <p class="fs-6">
                Welcome back! login with your data that you entered during
                registration
              </p>
              <div class="mb-5">
                <button @click="handleGoogleLogin" class="btn btn-white w-100">
                  <div class="btn__wrap">
                    <i class="ri-google-fill"></i>
                    <span class="ms-2"> Login with Google </span>
                  </div>
                </button>
              </div>
              <div class="mb-4">
                <div class="auth__or mx-auto fw-medium"></div>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label fw-medium"
                  >Username</label
                >
                <input type="text" id="username" class="form-control" />
              </div>
              <div class="mb-2">
                <label for="password" class="form-label fw-medium"
                  >Password</label
                >
                <input type="password" id="password" class="form-control" />
              </div>
              <div class="mb-4 text-end">
                <a href="#" class="link-primary fw-medium">Forgot Password?</a>
              </div>
              <div class="mb-5">
                <input
                  type="submit"
                  class="btn btn-primary w-100"
                  value="Login"
                />
              </div>
              <p>
                Not registered yet?<br />
                <NuxtLink to="/register" class="fw-medium external">
                  Register
                </NuxtLink>
              </p>
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
});

const { $googleSignIn } = useNuxtApp();

const handleGoogleLogin = async () => {
  try {
    google.accounts.id.disableAutoSelect(); // Reset trạng thái tài khoản cũ
    await $googleSignIn(); // Chờ Google xử lý
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
  }
};
</script>

<style></style>
