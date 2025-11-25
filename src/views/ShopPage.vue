<template>
  <div class="shop-page" :style="{ backgroundImage: `url(${homeBackground})` }">
    <header class="shop-header">
      <button class="back-btn" @click="goBack">
        <img :src="backIcon" alt="返回" class="back-icon" />
      </button>
      <h1>宠物商城</h1>
      <div class="coins-display">
        <span class="coins-text">金币:</span>
        <span class="coins-amount">{{ coins }}</span>
      </div>
    </header>
    
    <div class="shop-content">
      <div class="product-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          @click="purchaseProduct(product)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }} 金币</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import fishIcon from '@/图标/果冻.png?url'
import juiceIcon from '@/图标/果汁.png?url'
import clothesIcon from '@/图标/衣服.png?url'
import feedIcon from '@/图标/胡萝卜.png?url'
import toyIcon from '@/图标/玩具熊.png?url'
import burgerIcon from '@/图标/汉堡.png?url'
import backIcon from '@/图标/返回.svg?url'
// 导入首页背景图片
import homeBackground from '@/图标/首页背景.png?url'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const router = useRouter()
const userStore = useUserStore()
const coins = computed(() => userStore.coins)

const products = ref<Product[]>([
  { id: 1, name: '果冻', price: 50, image: fishIcon },
  { id: 2, name: '胡萝卜', price: 50, image: feedIcon },
  { id: 3, name: '果汁', price: 50, image: juiceIcon },
  { id: 4, name: '衣服', price: 200, image: clothesIcon },
  { id: 5, name: '玩具熊', price: 150, image: toyIcon },
  { id: 6, name: '汉堡包', price: 80, image: burgerIcon }
])

const goBack = () => {
  router.push('/home')
}

const purchaseProduct = (product: Product) => {
  if (userStore.coins >= product.price) {
    if (userStore.deductCoins(product.price)) {
      alert(`购买成功！你购买了 ${product.name}，花费：${product.price} 金币`)
      // 这里可以添加实际的购买逻辑
    }
  } else {
    alert(`金币不足！你需要 ${product.price} 金币，但你只有 ${userStore.coins} 金币`)
  }
}
</script>

<style scoped lang="scss">
.shop-page {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 80px;
  
  // 深色主题
  body.dark-theme & {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.shop-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  padding: 0 10px;
  
  .back-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    
    .back-icon {
      width: 24px;
      height: 24px;
    }
  }
  
  h1 {
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    flex: 1;
    text-align: center;
  }

  .coins-display {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
    border-radius: 20px;
    
    .coins-text {
      color: white;
      font-size: 14px;
    }
    
    .coins-amount {
      color: #FFD700;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
  
.shop-content {
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .product-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.3s;
    
    &:active {
      transform: scale(0.95);
    }
    
    .product-image {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      
      img {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
      }
    }
    
    .product-info {
      text-align: center;
      
      .product-name {
        font-size: 16px;
        color: #333;
        margin: 0 0 5px 0;
      }
      
      .product-price {
        font-size: 14px;
        color: #F08713;
        margin: 0;
        font-weight: bold;
      }
    }
  }
}
</style>
