import axios from "axios";
import { useUserStore } from "@/stores/user";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiBase,
  });

  instance.interceptors.request.use(
    (config) => {
      const userStore = useUserStore();

      // Load lại từ localStorage nếu chưa load
      if (!userStore.isLoaded) {
        userStore.loadUserFromLocalStorage();
      }

      const token = userStore.user.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
