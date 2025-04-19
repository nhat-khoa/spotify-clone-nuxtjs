<template>
  <div
    class="hero"
    style="
      background-image: url(/images/banner/event.jpg);
      height: 300px;
      background-size: cover;
    "
  ></div>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h4 class="fw-bold">
        Choose Your <span class="text-primary">Plan</span>
      </h4>
    </div>
    <div class="row g-4 justify-content-center">
      <!-- Free Plan -->
      <div class="col-md-6 col-lg-5">
        <div class="card h-100 border-primary">
          <div class="card-body d-flex flex-column">
            <div class="mb-3">
              <h5 class="card-title">
                <i class="ri-music-2-line me-2"></i>Free
              </h5>
              <p class="text-muted">What you'll get:</p>
              <ul class="list-unstyled">
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  Access all free tracks and app features
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  No Ads between tracks
                </li>
              </ul>
            </div>
            <div class="mt-auto">
              <div class="fw-bold mb-3">0 VNĐ / year</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium Plan -->
      <div class="col-md-6 col-lg-5">
        <div class="card h-100 border-warning position-relative">
          <!-- Nút Verify nhỏ trên góc phải -->
          <button
            v-if="premiumExpired === null"
            @click="verifyPayment"
            class="btn btn-sm btn-outline-warning position-absolute top-0 end-0 m-2 d-flex align-items-center"
            :disabled="isVerifying"
          >
            <span
              v-if="isVerifying"
              class="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            {{ isVerifying ? "..." : "Verify Payment" }}
          </button>

          <div class="card-body d-flex flex-column">
            <div class="mb-3">
              <h5 class="card-title">
                <i class="ri-vip-crown-line me-2"></i>Premium
              </h5>
              <p class="text-muted">What you'll get:</p>
              <ul class="list-unstyled">
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  Access all free tracks and app features
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  No Ads between tracks
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  Create playlists and add tracks to them
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  Listen premium tracks and albums
                </li>
                <li class="mb-2 d-flex align-items-start">
                  <i class="ri-checkbox-circle-fill text-primary me-2"></i>
                  Download and listen offline
                </li>
              </ul>
            </div>

            <div class="mt-auto">
              <div class="fw-bold mb-3">99.000 VNĐ / year</div>

              <div v-if="premiumExpired === null">
                <button
                  @click="createPaymentPremium"
                  class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {{ isLoading ? "Processing..." : "Buy" }}
                </button>
              </div>

              <div v-else>
                <div class="alert alert-info text-center">
                  Premium active until
                  <strong>{{ formatDate(premiumExpired) }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";

definePageMeta({
  layout: "default2",
});

const { $axios } = useNuxtApp();
const toast = useToast();
const premiumExpired = ref(null);
const isLoading = ref(false);
const appTransId = ref(null);
const isVerifying = ref(false);

onMounted(async () => {
  try {
    const response = await $axios.get("/api/profile/");
    console.log("response: ", response);
    premiumExpired.value = response.data.premium_expired;
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu", error);
    toast.error("Lỗi khi fetch dữ liệu" + error);
  }
});

const createPaymentPremium = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.post("/api/payment/create/");
    const orderUrl = response.data.order_url;
    localStorage.setItem("app_trans_id", response.data.app_trans_id);
    if (orderUrl) {
      window.open(orderUrl, "_blank");
    }
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu", error);
    toast.error("Lỗi khi fetch dữ liệu: " + error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const verifyPayment = async () => {
  try {
    isVerifying.value = true;
    appTransId.value = localStorage.getItem("app_trans_id");
    if (!appTransId.value) {
      toast.info("Chưa có giao dịch nào được thực hiện!");
      return;
    }
    const response = await $axios.post("/api/payment/status/", {
      app_trans_id: appTransId.value,
    });

    if (response.data.return_code === 1) {
      toast.success("✅ Thanh toán đã được xác nhận!");
      localStorage.removeItem("app_trans_id");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      toast.info("⏳ Giao dịch chưa hoàn tất hoặc không hợp lệ.");
    }
  } catch (error) {
    console.error("Lỗi khi xác minh thanh toán", error);
    toast.error("❌ Lỗi khi xác minh thanh toán");
  } finally {
    isVerifying.value = false;
  }
};
</script>

<style></style>
