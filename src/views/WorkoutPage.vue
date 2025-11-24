<template>
  <div class="workout-page">
    <!-- 头部 -->
    <header class="header">
      <h1 class="subtle-header">运动连接</h1>
      <div @click="scanDevices" class="scan-btn">
        <img :src="scanDeviceIcon" alt="扫描设备" class="scan-icon" />
      </div>
    </header>

    <!-- 连接状态 -->
    <div v-if="connectedDevice" class="connected-status">
      <div class="status-icon">✅</div>
      <div class="status-info">
        <div class="device-name">{{ connectedDevice.name }}</div>
        <div class="device-type">{{ connectedDevice.type }}</div>
      </div>
      <div class="battery-info">
        <span>🔋 {{ connectedDevice.battery }}%</span>
      </div>
    </div>

    <!-- 蓝牙设备列表 -->
    <div class="devices-section">
      <div class="section-header">
        <h2>可用设备</h2>
        <span class="device-count">{{ devices.length }} 台设备</span>
      </div>
      <div class="device-list">
        <div 
          v-for="device in devices" 
          :key="device.id"
          class="device-item"
          :class="{ connected: device.connected }"
        >
          <div class="device-icon">
            <img :src="device.icon" :alt="device.type" class="device-image" />
          </div>
          <div class="device-info">
            <div class="device-name">{{ device.name }}</div>
            <div class="device-type">{{ device.type }}</div>
          </div>
          <button 
            @click="toggleConnection(device)"
            class="connect-btn"
            :class="{ connected: device.connected }"
          >
            {{ device.connected ? '断开' : '连接' }}
          </button>
        </div>
        <div v-if="devices.length === 0" class="empty-state">
          <div class="empty-icon">📱</div>
          <p>未发现设备</p>
          <p class="empty-hint">请确保蓝牙已开启并点击扫描</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BluetoothDevice } from '@/types'
// 导入设备图标
import jumpRopeIcon from '@/图标/跳绳.png?url'
import yogaMatIcon from '@/图标/瑜伽垫.png?url'
import treadmillIcon from '@/图标/跑步机.png?url'
// 导入扫描设备图片
import scanDeviceIcon from '@/图标/扫描设备.png?url'

const scanning = ref(false)
const connectedDevice = ref<BluetoothDevice | null>(null)

const devices = ref<BluetoothDevice[]>([
  { id: '1', name: '智能跳绳', type: '跳绳', connected: false, battery: 85, icon: jumpRopeIcon },
  { id: '2', name: '动作视觉识别瑜伽垫', type: '智能瑜伽垫', connected: false, battery: 92, icon: yogaMatIcon },
  { id: '3', name: '跑步机 Pro', type: '跑步机', connected: false, icon: treadmillIcon }
])

const scanDevices = async () => {
  scanning.value = true
  // 模拟扫描
  setTimeout(() => {
    scanning.value = false
  }, 2000)
}

const toggleConnection = (device: BluetoothDevice) => {
  device.connected = !device.connected
  if (device.connected) {
    connectedDevice.value = device
  } else if (connectedDevice.value?.id === device.id) {
    connectedDevice.value = null
  }
}
</script>

<style scoped lang="scss">
.workout-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  
  // 深色主题
  body.dark-theme & {
    background: #1a1a1a;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    color: #333;
    font-size: 24px;
    font-weight: bold;
    
    // 深色主题
    body.dark-theme & {
      color: #f0f0f0;
    }
  }
  
  .subtle-header {
    color: #999;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    flex: 1;
    margin: 0;
    padding: 0;
    
    // 深色主题
    body.dark-theme & {
      color: #bbb;
    }
  }
  
  .scan-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    
    .scan-icon {
      width: 100px;
      height: 30px;
      object-fit: contain;
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}

.connected-status {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #91B3F0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  color: white;
  
  // 深色主题
  body.dark-theme & {
    background: #333;
  }
  
  .status-icon {
    font-size: 32px;
  }
  
  .status-info {
    flex: 1;
    
    .device-name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
      
      // 深色主题
      body.dark-theme & {
        color: #f0f0f0;
      }
    }
    
    .device-type {
      font-size: 12px;
      opacity: 0.9;
      
      // 深色主题
      body.dark-theme & {
        color: #bbb;
      }
    }
  }
  
  .battery-info {
    font-size: 14px;
    
    // 深色主题
    body.dark-theme & {
      color: #f0f0f0;
    }
  }
}

.devices-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  // 深色主题
  body.dark-theme & {
    background: #444;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h2 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    
    // 深色主题
    body.dark-theme & {
      color: #f0f0f0;
    }
  }
  
  .device-count {
    font-size: 14px;
    color: #999;
    
    // 深色主题
    body.dark-theme & {
      color: #bbb;
    }
  }
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .device-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #f9f9f9;
    border-radius: 8px;
    transition: all 0.3s;
    
    // 深色主题
    body.dark-theme & {
      background: #333;
    }
    
    &.connected {
      background-image: url('@/图标/队伍卡片背景.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border: 1px solid #8FAADC;
      
      // 深色主题
      body.dark-theme & {
        background-image: url('@/图标/队伍卡片背景.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
    
    .device-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .device-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    
    .device-info {
      flex: 1;
      
      .device-name {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        margin-bottom: 4px;
        
        // 深色主题
        body.dark-theme & {
          color: #f0f0f0;
        }
      }
      
      .device-type {
        font-size: 12px;
        color: #999;
        
        // 深色主题
        body.dark-theme & {
          color: #bbb;
        }
      }
    }
    
    .connect-btn {
      padding: 6px 16px;
      border: 1px solid #8FAADC;
      border-radius: 16px;
      background: white;
      color: #8FAADC;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      
      // 深色主题
      body.dark-theme & {
        background: #333;
        border-color: #F08713;
        color: #F08713;
      }
      
      &.connected {
        background: #8FAADC;
        color: white;
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      
      // 深色主题
      body.dark-theme & {
        color: #f0f0f0;
      }
    }
    
    p {
      color: #999;
      font-size: 14px;
      margin-bottom: 8px;
      
      // 深色主题
      body.dark-theme & {
        color: #bbb;
      }
      
      &.empty-hint {
        font-size: 12px;
      }
    }
  }
}
</style>