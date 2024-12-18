<template>
  <div class="sidebar-container">
    <!-- 个人信息卡片 -->
    <div class="profile-card">
      <div class="avatar">
        <img :src="profile.avatar" :alt="profile.name" 
             @error="handleImageError"
             :class="{ 'loading-image': isLoading }"/>
      </div>
      <h2 class="name">{{ profile.name }}</h2>
      <p class="bio">{{ profile.bio }}</p>
      <div class="stats">
        <div class="stat-item">
          <span class="number">{{ profile.posts }}</span>
          <span class="label">文章</span>
        </div>
        <div class="stat-item">
          <span class="number">{{ profile.tags }}</span>
          <span class="label">标签</span>
        </div>
        <div class="stat-item">
          <span class="number">{{ profile.categories }}</span>
          <span class="label">分类</span>
        </div>
      </div>
      <a :href="profile.github" class="github-btn" target="_blank">
        <i class="fab fa-github"></i>
        主题 GitHub
      </a>
    </div>

    <!-- 公告卡片 -->
    <div class="notice-card">
      <h3 class="notice-title">
        <i class="fas fa-bullhorn"></i>
        公告
      </h3>
      <div class="notice-content">
        {{ notice }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loadingGif from '@/assets/loading.gif'

interface Profile {
  name: string
  avatar: string
  bio: string
  posts: number
  tags: number
  categories: number
  github: string
}

const props = defineProps<{
  profile: Profile
  notice: string
}>()

const isLoading = ref(false)

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (!target.src.includes('loading.gif')) {
    isLoading.value = true
    target.src = loadingGif
    target.classList.add('loading-image')
  }
}
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 80px;
}

.profile-card, .notice-card {
  background: #f8e1e7; /* 使用更柔和的粉色 */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.name {
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
}

.bio {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.number {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.label {
  font-size: 0.8rem;
  color: #666;
}

.github-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #24292e;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.github-btn:hover {
  background: #2f363d;
}

.notice-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.notice-content {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .sidebar-container {
    position: static;
  }
}
</style>