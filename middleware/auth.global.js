import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();

    // Kiểm tra nếu dữ liệu chưa được load từ localStorage thì load
    if (!userStore.isLoaded) {
        userStore.loadUserFromLocalStorage();
    }

    const accessToken = userStore.user.access_token; // Lấy access_token trực tiếp từ user

    const publicPages = ["/login", "/register"];

    if (to.path === "/") return navigateTo("/home", { replace: true });

    // Nếu đã login mà vào /login hoặc /register => Redirect về trang chính
    if (accessToken && publicPages.includes(to.path)) {
        return navigateTo("/home", { replace: true });
    }

    // Nếu là trang public thì không cần check tiếp
    if (publicPages.includes(to.path)) return;

    // Nếu không có token, chuyển hướng đến trang login
    if (!accessToken) {
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
            throw new Error("Token không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi xác thực:", error);
        toast.error("Lỗi xác thực: " + error);
        return navigateTo("/login", { replace: true });
    }
});
