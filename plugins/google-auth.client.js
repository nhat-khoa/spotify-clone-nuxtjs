export default defineNuxtPlugin(() => {
    return {
        provide: {
            googleSignIn: () => {
                google.accounts.id.initialize({
                    client_id: useRuntimeConfig().public.googleClientId,
                    callback: async (response) => {
                        console.log("Google Response:", response);
                        const token = response.credential; // ID Token từ Google
                        await loginWithGoogle(token); // Gọi API Django
                    },
                    ux_mode: "redirect", // Chuyển hướng thay vì popup
                    use_fedcm_for_consent: false, // Tắt FedCM để tránh lỗi
                });
                google.accounts.id.prompt();
            },
        },
    };
});
// Hàm gửi token Google lên Django để xác thực
async function loginWithGoogle(token) {
    console.log("token: ", token)
    // try {
    //     const response = await fetch("http://127.0.0.1:8000/api/auth/google-login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ token }),
    //     });

    //     const data = await response.json();

    //     if (response.ok) {
    //         localStorage.setItem("access_token", data.access_token); // Lưu token vào localStorage
    //         navigateTo("/home"); // Chuyển hướng sau khi đăng nhập thành công
    //     } else {
    //         console.error("Login failed:", data);
    //     }
    // } catch (error) {
    //     console.error("Error during login:", error);
    // }
}