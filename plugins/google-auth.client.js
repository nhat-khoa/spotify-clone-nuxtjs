export default defineNuxtPlugin(() => {
    return {
        provide: {
            googleSignIn: () => {
                google.accounts.id.initialize({
                    client_id: useRuntimeConfig().public.googleClientId,
                    callback: (response) => {
                        console.log("Google Response:", response);
                        window.location.href = `/home?token=${response.credential}`; // Chuyển hướng sau khi đăng nhập
                    },
                    ux_mode: "redirect", // Chuyển hướng thay vì popup
                    use_fedcm_for_consent: false, // Tắt FedCM để tránh lỗi
                });
                google.accounts.id.prompt();
            },
        },
    };
});
