<template>
  <div class="account-settings-page">
    <!-- 顶部导航栏 -->
    <header class="header">
      <button @click="goBack" class="back-btn">
        <img :src="backIcon" alt="返回" class="back-icon" />
      </button>
      <h1 class="page-title">账户设置</h1>
    </header>

    <!-- 用户信息卡片 -->
    <div class="user-info-card">
      <div class="avatar-section">
        <div class="avatar-container">
          <div class="user-avatar">{{ user.avatar }}</div>
          <button @click="changeAvatar" class="change-avatar-btn">✏️</button>
        </div>
        <p class="avatar-tip">点击头像更换</p>
      </div>

      <div class="info-item">
        <label class="info-label">用户名</label>
        <div class="info-value">{{ user.username }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">ID号</label>
        <div class="info-value">{{ user.id }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">邮箱</label>
        <div class="info-value">{{ user.email }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">手机号</label>
        <div class="info-value">{{ user.phone || '未绑定' }}</div>
      </div>

      <div class="info-item">
        <label class="info-label">注册时间</label>
        <div class="info-value">{{ formatDate(user.createdAt) }}</div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions-section">
      <button @click="editProfile" class="action-btn primary">编辑资料</button>
      <button @click="changePassword" class="action-btn">修改密码</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import backIcon from '@/图标/返回.svg'

const router = useRouter()
const userStore = useUserStore()
const { user } = userStore

const goBack = () => {
  router.back()
}

const changeAvatar = () => {
  console.log('更换头像')
  // 这里可以实现更换头像的逻辑
}

const editProfile = () => {
  console.log('编辑资料')
  // 这里可以实现编辑资料的逻辑
}

const changePassword = () => {
  console.log('修改密码')
  // 这里可以实现修改密码的逻辑
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
</script>

<style scoped lang="scss">
.account-settings-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  padding-top: 60px;
  padding-bottom: 80px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
  
  .back-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .back-icon {
      width: 24px;
      height: 24px;
    }
  }
  
  .page-title {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0;
  }
}

.user-info-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  .avatar-section {
    text-align: center;
    margin-bottom: 30px;
    
    .avatar-container {
      position: relative;
      display: inline-block;
      margin-bottom: 12px;
      
      .user-avatar {
        width: 80px;
        height: 80px;
        background: #f0f0f0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        margin: 0 auto;
        border: 3px solid #F08713;
      }
      
      .change-avatar-btn {
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
    
    .avatar-tip {
      font-size: 12px;
      color: #999;
      margin: 0;
    }
  }
  
  .info-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      width: 80px;
      font-size: 14px;
      color: #999;
      margin-right: 16px;
    }
    
    .info-value {
      flex: 1;
      font-size: 16px;
      color: #333;
    }
  }
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .action-btn {
    padding: 16px;
    border: none;
    border-radius: 12px;
    background: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    &.primary {
      background: #F08713;
      color: white;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
}
</style>