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

definePageMeta({
  layout: "auth",
});

const { $googleSignIn } = useNuxtApp();
const toast = useToast();

const handleGoogleLogin = async () => {
  try {
    google.accounts.id.disableAutoSelect(); // Reset trạng thái tài khoản cũ
    const credential = await $googleSignIn();
    console.log("credential nhận được từ google:", credential);
    await loginWithGoogle(credential);
  } catch (error) {
    toast.error("Đăng nhập thất bại!");
  }
};

// Hàm gửi token Google lên Django để xác thực và lấy thông tin người dùng
async function loginWithGoogle(credential) {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/google-login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Lưu access_token vào cookie với thời gian hết hạn là 1 ngày
      Cookies.set("access_token", data.access_token, {
        expires: 1,
        secure: false, //true chỉ hoạt động trên HTTPS
      });
      console.log("data response:", data);
      navigateTo("/home"); // Chuyển hướng sau khi đăng nhập thành công
    } else {
      console.error("Login failed:", data);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}
</script>

<style></style>
