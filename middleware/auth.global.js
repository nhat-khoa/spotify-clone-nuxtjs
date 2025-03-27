import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const publicPages = ["/login", "/register"];

    if (publicPages.includes(to.path)) {
        return;
    }

    if (process.client) {
        // Lấy token từ cookie trên client-side
        const token = Cookies.get("access_token");

        if (!token) {
            return navigateTo("/login");
        }

        try {
            // Gửi request xác thực token với Django
            const response = await fetch("http://localhost:8000/api/auth/verify/", {
                method: "POST",
                credentials: "include", // Gửi cookie đi theo request
            });

            if (!response.ok) {
                throw new Error("Token không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi xác thực:", error);
            Cookies.remove("access_token"); // Xóa token nếu lỗi
            return navigateTo("/login");
        }
    }
});
