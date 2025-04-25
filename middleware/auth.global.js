import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { $axios } = useNuxtApp();

  // Load từ localStorage nếu chưa load
  if (!userStore.isLoaded) {
    userStore.loadUserFromLocalStorage();
  }

  const accessToken = userStore.user.access_token;

  if (!accessToken || accessToken.trim() === "") {
    if (to.meta.guest) return;
    return navigateTo("/login", { replace: true });
  }

  // Gọi API verify bằng axios (đã tự động gắn Bearer token qua interceptor)
  try {
    await $axios.post("/api/auth/verify/"); // Không cần headers thủ công nữa
    return;
  } catch (error) {
    userStore.logout();
    console.log('user logout in auth !!!')
    if (to.meta.guest) return;
    return navigateTo("/login", { replace: true });
  }

});
