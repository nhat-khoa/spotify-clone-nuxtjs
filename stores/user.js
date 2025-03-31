import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: '',
        email: '',
        full_name: '',
        avatar_url: ''
    })

    const isLoaded = ref(false) // Ban đầu là false

    // Chỉ load từ localStorage khi gọi hàm này (không gọi tự động)
    const loadUserFromLocalStorage = () => {
        if (typeof window !== 'undefined') { // Kiểm tra có chạy trên client không
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                user.value = JSON.parse(storedUser)
            }
            isLoaded.value = true // Đánh dấu đã load xong
        }
    }

    const setUser = (newUser) => {
        user.value = newUser
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(newUser))
        }
    }

    const logout = () => {
        user.value = { id: '', email: '', full_name: '', avatar_url: '' }
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user')
        }
    }

    return { user, isLoaded, setUser, logout, loadUserFromLocalStorage }
})
