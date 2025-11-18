import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: '1',
    username: '运动达人',
    avatar: '👤',
    email: 'user@petfit.com',
    createdAt: new Date().toISOString()
  })

  const isLoggedIn = ref(true)

  const login = async (email: string, password: string) => {
    // 模拟登录
    isLoggedIn.value = true
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
})
