import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: '1',
    username: '运动达人',
    avatar: '👤',
    email: 'user@fitpet.com',
    createdAt: new Date().toISOString()
  })

  const coins = ref<number>(1000) // 初始金币数
  
  const isLoggedIn = ref(true)

  const login = async (email: string, password: string) => {
    // 模拟登录
    isLoggedIn.value = true
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  const addCoins = (amount: number) => {//增加金币
    coins.value += amount
  }

  const deductCoins = (amount: number) => {//减少金币
    if (coins.value >= amount) {
      coins.value -= amount
      return true
    }
    return false
  }
  
  return {
    user,
    coins,
    isLoggedIn,
    login,
    logout,
    addCoins,
    deductCoins
  }
})
