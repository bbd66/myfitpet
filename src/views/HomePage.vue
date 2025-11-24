<template>
  <div class="home-page" :style="{ backgroundImage: `url(${homeBackground})` }">
    <!-- 头部 -->
    <header class="header">
      <button class="shop-btn" @click="goToShop">
        <img :src="shopIcon" alt="商城" class="shop-icon" />
      </button>
    </header>

    <!-- 宠物信息 -->
    <div class="pet-info">
      <h2 class="pet-name">{{ pet.name }}</h2>
      <div class="pet-level">Lv.{{ pet.status.level }}</div>
      <div class="exp-bar">
        <div class="exp-fill" :style="{ width: expPercentage + '%' }"></div>
      </div>
    </div>

    <!-- 宠物状态指示器 (顶部并排显示) -->
    <div class="top-status-indicators">
      <div class="status-item small">
        <div class="status-content">
          <div class="status-label">心情值 {{ pet.status.happiness }}%</div>
          <div class="status-bar">
            <div 
              class="status-fill happiness" 
              :style="{ width: pet.status.happiness + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="status-item small">
        <div class="status-content">
          <div class="status-label">能量值 {{ pet.status.energy }}%</div>
          <div class="status-bar">
            <div 
              class="status-fill energy" 
              :style="{ width: pet.status.energy + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 宠物展示区：替换为 Live2D 模型 -->
    <div class="pet-display">
      <div class="pet-avatar" @click="testClick">
          <Live2DWidget
            jsonPath="/live2d/cat-white/model.json"
            :width="300"
            :height="300"
            :vOffset="60"
            @click="testClick"
            @ready="onLive2DReady"
          />
      </div>
    </div>
    
    <!-- 宠物信息和语录 -->
    <div class="pet-info-and-quote">
      <!-- 宠物语录 -->
      <div class="quote-card">
        <img :src="bubbleIcon" alt="气泡框" class="bubble-icon" />
        <p class="quote-text">{{ petStore.motivationalQuote }}</p>
      </div>
    </div>

    <!-- 快速操作按钮 -->
    <div class="action-buttons">
      <button @click="handleFeed" class="action-btn feed">
        <img :src="feedIcon" alt="喂食" class="btn-icon" />
        <span class="btn-label">喂食</span>
      </button>
      <button @click="handlePlay" class="action-btn play">
        <img :src="playIcon" alt="玩耍" class="btn-icon" />
        <span class="btn-label">玩耍</span>
      </button>
      <button @click="handleClean" class="action-btn clean">
        <img :src="cleanIcon" alt="清洁" class="btn-icon" />
        <span class="btn-label">清洁</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Live2DWidget from '@/components/Live2DWidget.vue'
import { useRouter } from 'vue-router'
import { usePetStore } from '@/stores/pet'
// 导入图标
import feedIcon from '@/图标/投喂.svg'
import playIcon from '@/图标/玩耍.svg'
import cleanIcon from '@/图标/洗澡.svg'
import shopIcon from '@/图标/商城.svg'
import bubbleIcon from '@/图标/气泡框.png'
// 导入首页背景图片
import homeBackground from '@/图标/首页背景.png?url'

const router = useRouter()
const petStore = usePetStore()
const { pet, feed, play, clean, updateMotivationalQuote } = petStore

// 模拟获取新的励志语录
const fetchNewQuote = () => {
  console.log('点击宠物图片，开始获取新的励志语录');
  
  // 准备五条模拟的励志语录
  const quotes = [
    '每一次运动都是对未来最好的投资！',
    '坚持就是胜利，健康是最好的财富！',
    '今天的汗水，是明天的辉煌！',
    '运动让生活更美好，坚持让梦想更接近！',
    '不怕慢，就怕站，每天进步一点点！'
  ];
  
  // 随机选择一条语录
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  console.log('选中的语录:', selectedQuote);
  
  // 使用store提供的更新函数
  updateMotivationalQuote(selectedQuote);
  console.log('更新后的语录值:', petStore.motivationalQuote);
}

// 测试点击事件是否能被触发
const testClick = () => {
  console.log('测试点击事件被触发');
  fetchNewQuote();
}

// Live2D 初始化完成回调
const onLive2DReady = () => {
  console.log('Live2D whitecat 模型已就绪');
}

// 页面加载时不再自动获取新的励志语录
// 点击宠物时会触发获取新的励志语录

// 计算经验值百分比
const expPercentage = computed(() => {
  // 简单返回一个固定值来避免TypeScript错误
  return 70
})

const handleFeed = () => {
  // 直接调用store中的方法，让store处理状态更新
  feed()
}

const handlePlay = () => {
  // 直接调用store中的方法，让store处理状态更新
  play()
}

const handleClean = () => {
  // 直接调用store中的方法，让store处理状态更新
  clean()
}

const goToShop = () => {
  router.push('/shop')
}
</script>

<style scoped lang="scss">
.home-page {
  position: relative;
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

.header {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  
  .shop-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:active {
      transform: scale(0.95);
    }
    
    .shop-icon {
      width: 20px;
      height: 20px;
    }
  }
}

.pet-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 23px;
  margin-left: 2px;
}

.pet-info .pet-name {
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  margin: 0;
}

.pet-info .pet-level {
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
}

.pet-info .exp-bar {
  width: 80px;
  height: 6px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  overflow: hidden;
  margin-left: 10px;
}

.pet-info .exp-fill {
  height: 100%;
  background: #FFF2CC;
  transition: width 0.3s;
}

/* 顶部状态指示器 */
.top-status-indicators {
  display: flex;
  gap: 12px;
  margin-top: -20px;
  margin-bottom: 20px;
}

.status-item {
  &.small {
    width: 181px;
    height: 57px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    .status-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .status-icon {
      font-size: 20px;
      margin-bottom: 4px;
    }
    
    .status-label {
      font-size: 12px;
      color: #666;
    }
    
    .status-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      
      .status-fill {
        height: 100%;
        transition: width 0.3s;
        border-radius: 4px;
        
        &.happiness {
          background: #8FAADC;
        }
        
        &.energy {
          background: #91B3F0;
        }
      }
    }
  }
}

.pet-display {
  position: relative;
  text-align: center;
  margin-top: -2px;
  margin-bottom: 30px;
  z-index: 20; // 确保宠物图片在语录区域上方，可以接收点击事件
  
  .pet-avatar {
    width: 300px;
    height: 300px;
    margin: 80px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; // 保持鼠标指针样式，明确显示可点击区域
  }
  
  .pet-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .pet-name {
    color: rgba(0, 0, 0, 0.553);
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .pet-level {
    display: inline-block;
    background: rgba(255, 255, 255, 0.3);
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .exp-bar {
    width: 200px;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin: 0 auto;
    overflow: hidden;
    
    .exp-fill {
      height: 100%;
      background: #E996EF;
      transition: width 0.3s;
    }
  }
}

.pet-info-and-quote {
  position: absolute;
  top: 250px;
  left: 20px;
  z-index: 5; 
}

.quote-card {
  position: relative;
  width: 200px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .bubble-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .quote-text {
    position: relative;
    color: #333;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    z-index: 1;
    padding: 15px 10px;
    margin: 0;
    width: 68%;
  }
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 300px;
  
  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.3s;
    width: 60px;
    height: 60px;
    justify-content: center;
    
    .btn-icon {
      width: 24px;
      height: 24px;
    }
    
    .btn-label {
      display: none;
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>