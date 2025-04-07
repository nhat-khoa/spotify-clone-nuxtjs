import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();

    // Kiểm tra nếu dữ liệu chưa được load từ localStorage thì load
    if (!userStore.isLoaded) {
        userStore.loadUserFromLocalStorage();
    }

    const accessToken = userStore.user.access_token;

    const publicPages = ["/login", "/register"];

    // Nếu là trang public thì không cần check tiếp
    if (publicPages.includes(to.path)) return;

    // Nếu không có token, chuyển hướng đến trang login
    if (!accessToken && accessToken == '') {
        return navigateTo("/login", { replace: true });
    }

    // Kiểm tra token có hợp lệ không bằng API
    try {
        const response = await fetch("http://localhost:8000/api/auth/verify/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            userStore.logout();
            return navigateTo("/login", { replace: true });
        }
        return;
    } catch (error) {
        userStore.logout();
        console.error("Lỗi xác thực:", error);
        return navigateTo("/login", { replace: true });
    }
});
