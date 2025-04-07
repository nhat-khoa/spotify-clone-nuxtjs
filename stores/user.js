import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: '',
        email: '',
        full_name: '',
        avatar_google_url: '',
        access_token: ''
    })

    const isLoaded = ref(false)

    const loadUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        }
        isLoaded.value = true // Đánh dấu đã load xong
    }

    const setUser = (newUser) => {
        user.value = newUser
        localStorage.setItem('user', JSON.stringify(newUser))
    }

    const logout = () => {
        user.value = {
            id: '', email: '', full_name: '',
            avatar_google_url: '', access_token: ''
        }
        localStorage.removeItem('user')
    }

    // Getter lấy access_token
    const accessToken = computed(() => user.value.access_token)

    return { user, isLoaded, setUser, logout, loadUserFromLocalStorage }
})
