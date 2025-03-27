import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const publicPages = ["/login", "/register"];
    if (publicPages.includes(to.path)) return;

    let token;

    if (process.server) {
        // ✅ Lấy token từ cookie khi chạy trên server
        const headers = useRequestHeaders(["cookie"]);
        token = headers?.cookie
            ?.split("; ")
            .find(row => row.startsWith("access_token="))
            ?.split("=")[1];
    } else {
        // ✅ Lấy token từ cookie khi chạy trên client
        token = Cookies.get("access_token");
    }

    console.log("Token: ", token);

    if (!token) {
        return navigateTo("/login", { replace: true });
    }

    try {
        const headers = {};

        if (process.server) {
            // ✅ Gửi cookie trong headers khi chạy trên server
            const reqHeaders = useRequestHeaders(["cookie"]);
            if (reqHeaders.cookie) {
                headers["Cookie"] = reqHeaders.cookie;
            }
        }

        const response = await fetch("http://localhost:8000/api/auth/verify/", {
            method: "POST",
            credentials: "include", // ✅ Giữ cookie khi chạy trên client
            headers, // ✅ Thêm headers chứa cookie khi chạy trên server
        });

        if (!response.ok) {
            throw new Error("Token không hợp lệ");
        }
    } catch (error) {
        console.error("Lỗi xác thực:", error);
        if (process.client) Cookies.remove("access_token");
        return navigateTo("/login", { replace: true });
    }
});
