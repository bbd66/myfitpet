<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-header">
        <div class="user-avatar-large">{{ user.avatar }}</div>
        <button @click="editProfile" class="edit-btn">✏️</button>
      </div>
      <div class="user-name">{{ user.username }}</div>
      <div class="user-email">{{ user.email }}</div>
    </div>

    <!-- 数据统计概要 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-value">{{ totalWorkouts }}</div>
        <div class="stat-label">总运动次数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalCalories }}</div>
        <div class="stat-label">总消耗(卡)</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ totalHours }}</div>
        <div class="stat-label">总时长(时)</div>
      </div>
    </div>

    <!-- 设置选项列表 -->
    <div class="settings-section">
      <div class="setting-group">
        <div class="group-title">通知设置</div>
        <div 
          v-for="item in notificationSettings" 
          :key="item.id"
          class="setting-item"
        >
          <div class="setting-icon">{{ item.icon }}</div>
          <div class="setting-label">{{ item.label }}</div>
          <label class="switch">
            <input type="checkbox" v-model="item.enabled">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="setting-group">
        <div class="group-title">其他设置</div>
        <div 
          v-for="item in otherSettings" 
          :key="item.id"
          @click="handleSetting(item.action)"
          class="setting-item"
        >
          <div class="setting-icon">{{ item.icon }}</div>
          <div class="setting-label">{{ item.label }}</div>
          <div class="setting-arrow">›</div>
        </div>
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="logout-section">
      <button @click="handleLogout" class="logout-btn">退出登录</button>
    </div>

    <!-- 版本信息 -->
    <div class="version-info">
      <p>PetFit v1.0.0</p>
      <p class="copyright">© 2025 PetFit Team</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const { user, logout } = userStore

const totalWorkouts = ref(156)
const totalCalories = ref(48250)
const totalHours = ref(128)


const notificationSettings = ref([
  { id: '1', icon: '🔔', label: '运动提醒', enabled: true },
  { id: '2', icon: '📢', label: '队伍动态', enabled: true },
  { id: '3', icon: '🏆', label: '成就通知', enabled: false },
  { id: '4', icon: '💬', label: '消息通知', enabled: true }
])

const otherSettings = ref([
  { id: '1', icon: '🌙', label: '深色模式', action: 'theme' },
  { id: '2', icon: '🌐', label: '语言设置', action: 'language' },
  { id: '4', icon: '❓', label: '帮助与反馈', action: 'help' },
  { id: '5', icon: '📄', label: '隐私政策', action: 'privacy' },
  { id: '6', icon: 'ℹ️', label: '关于我们', action: 'about' }
])

const editProfile = () => {
  router.push('/account-settings')
}

const handleSetting = (action: string) => {
  switch (action) {
    case 'theme':
      // 深色模式设置
      router.push('/theme-settings')
      break
    case 'language':
      // 语言设置
      router.push('/language-settings')
      break
    case 'help':
      // 帮助与反馈
      router.push('/help-feedback')
      break
    case 'privacy':
      // 隐私政策
      router.push('/privacy-policy')
      break
    case 'about':
      // 关于我们
      router.push('/about-us')
      break
    default:
      console.log('未知设置操作:', action)
  }
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    logout()
    console.log('已退出登录')
  }
}
</script>

<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 20px 80px;
  
  // 深色主题
  body.dark-theme & {
    background: #1a1a1a;
  }
}

.user-card {
  background-image: url('@/图标/队伍卡片背景.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 16px;
  padding: 30px 20px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  
  // 深色主题
  body.dark-theme & {
    background-image: url('@/图标/队伍卡片背景.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .user-header {
    position: relative;
    display: inline-block;
    margin-bottom: 16px;
    
    .user-avatar-large {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      margin: 0 auto;
      border: 3px solid rgba(255, 255, 255, 0.5);
    }
    
    .edit-btn {
      position: absolute;
      bottom: 0;
      right: -10px;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: white;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .user-name {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 8px;
    
    // 深色主题
    body.dark-theme & {
      color: #f0f0f0;
    }
  }
  
  .user-email {
    font-size: 14px;
    opacity: 0.9;
    
    // 深色主题
    body.dark-theme & {
      color: #ddd;
    }
  }
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  
  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    // 深色主题
    body.dark-theme & {
      background: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    
    .stat-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .stat-value {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-bottom: 4px;
      
      // 深色主题
      body.dark-theme & {
        color: #f0f0f0;
      }
    }
    
    .stat-label {
      font-size: 12px;
      color: #999;
      
      // 深色主题
      body.dark-theme & {
        color: #bbb;
      }
    }
  }
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
  
  .setting-group {
    .group-title {
      font-size: 14px;
      color: #999;
      margin-bottom: 12px;
      padding-left: 4px;
    }
    
    .setting-item {
      display: flex;
      align-items: center;
      gap: 12px;
      background: white;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      
      &:active {
        transform: scale(0.98);
        background: #f9f9f9;
      }
      
      // 深色主题
      body.dark-theme & {
        background: #333;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        
        &:active {
          background: #444;
        }
      }
      
      .setting-icon {
        font-size: 24px;
      }
      
      .setting-label {
        flex: 1;
        font-size: 16px;
        color: #333;
        
        // 深色主题
        body.dark-theme & {
          color: #f0f0f0;
        }
      }
      
      .setting-arrow {
        font-size: 20px;
        color: #ccc;
        
        // 深色主题
        body.dark-theme & {
          color: #999;
        }
      }
      
      .switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 28px;
        
        input {
          opacity: 0;
          width: 0;
          height: 0;
          
          &:checked + .slider {
            background-color: #8FAADC;
          }
          
          &:checked + .slider:before {
            transform: translateX(20px);
          }
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 28px;
          
          &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
          }
        }
      }
    }
  }
}

.logout-section {
  margin-bottom: 20px;
  
  .logout-btn {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 12px;
    background: white;
    color: #FF6B6B;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    &:active {
      transform: scale(0.98);
      background: #f9f9f9;
    }
    
    // 深色主题
    body.dark-theme & {
      background: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      
      &:active {
        background: #444;
      }
    }
  }
}

.version-info {
  text-align: center;
  padding: 20px 0;
  
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 4px;
    
    &.copyright {
      font-size: 11px;
    }
  }
}
</style>