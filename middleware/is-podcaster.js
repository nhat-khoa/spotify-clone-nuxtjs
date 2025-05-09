import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const { $axios } = useNuxtApp();

  if (!userStore.user.is_podcaster) {
    return navigateTo(from.fullPath, { replace: true });
  }

  return;
});