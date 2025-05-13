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
                  <label for="full_name" class="form-label fw-medium">Full Name</label>
                  <input type="text" id="full_name" class="form-control" v-model="full_name"/>
                </div>
                <div class="mb-3">
                  <label for="phone" class="form-label fw-medium">Phone Number</label>
                  <input type="tel" id="phone" class="form-control" v-model="phone"/>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label fw-medium">Email</label>
                  <input type="text" id="email" class="form-control" v-model="email"/>
                </div>
                <div class="mb-2">
                  <label for="password" class="form-label fw-medium"
                    >Password</label
                  >
                  <input type="password" id="password" class="form-control" v-model="password" />
                </div>
                <div class="mb-3">
                  <label for="c_password" class="form-label fw-medium"
                    >Confirm Password</label
                  >
                  <input type="password" id="c_password" class="form-control" v-model="c_password" />
                </div>
                <div class="mb-4">
                  <div class="form-check mb-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="agree"
                      v-model="agree"
                    />
                    <label class="form-check-label" for="agree"
                      >I agree <a href="#">Terms & Condition</a></label
                    >
                  </div>
                </div>
                <div class="mb-5">
                  <input type="submit" class="btn btn-primary w-100" value="Register" @click.prevent="handleRegister" />
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
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: "auth",
  guest: true,
});

const { $axios } = useNuxtApp();

const toast = useToast();

const email = ref("");
const password = ref("");
const c_password = ref("");
const full_name = ref("");
const phone = ref("");
const agree = ref(false);
const handleRegister = async () => {
  if (email.value === "" || password.value === "" || c_password.value === "" || full_name.value === "") {
    toast.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  if (password.value !== c_password.value) {
    toast.error("Mật khẩu không khớp");
    return;
  }
  if (!agree.value) {
    toast.error("Vui lòng đồng ý với điều khoản");
    return;
  }

  try {
    const { data } = await $axios.post("/api/auth/register/", {
      email: email.value,
      password: password.value,
      c_password: c_password.value,
      full_name: full_name.value,
      phone: phone.value || '',
    });
    toast.success("Đăng ký thành công", {
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
    navigateTo('/login');
  } catch (error) {
    toast.error("Đăng ký thất bại", {
      position: "bottom-center",
      pauseOnHover: false,
      hideProgressBar: true,
      icon: true,
    });
  }
};

</script>

<style></style>
