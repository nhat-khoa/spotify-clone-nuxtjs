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
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: "auth",
});

const { $googleSignIn, $axios } = useNuxtApp();
const toast = useToast();
const userStore = useUserStore();

const handleGoogleLogin = async () => {
  try {
    google.accounts.id.disableAutoSelect();
    const credential = await $googleSignIn();
    console.log("credential nhận được từ google:", credential);
    await loginWithGoogle(credential);
  } catch (error) {
    toast.error("Login Google failed!");
    console.error("Login Google failed!", error);
  }
};

async function loginWithGoogle(credential) {
  try {
    const response = await $axios.post("/api/auth/google-login/", {
      credential,
    });
    const data = response.data;

    console.log("data response:", data);

    // Lưu thông tin user vào Pinia & localStorage
    userStore.setUser({
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.full_name,
      avatar_google_url: data.user.avatar_google_url,
      access_token: data.access_token,
    });

    toast.success("Login success!");
    navigateTo("/home");
  } catch (error) {
    console.error("Error during login:", error);

    if (error.response?.data) {
      toast.error("Login failed: " + JSON.stringify(error.response.data));
    } else {
      toast.error("Login failed: " + error.message);
    }
  }
}
</script>

<style></style>
