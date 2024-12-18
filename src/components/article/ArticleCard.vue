<template>
  <div class="article-card" @click="handleClick">
    <!-- 左侧图片 -->
    <div class="article-cover">
      <img 
        :src="article.coverImage" 
        :alt="article.title"
        @error="handleImageError"
        :class="{ 'loading-image': isLoading }"
      >
    </div>
    <!-- 右侧内容 -->
    <div class="article-content">
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-description">{{ article.description }}</p>
      <div class="article-meta">
        
        <span class="publish-date">
          <i class="fas fa-calendar" style="color: pink;"></i>
          {{ article.publishDate }}
        </span>
        <span class="reading-time">
          <i class="fas fa-clock" style="color: pink"></i>
          {{ article.readingTime }} 分钟阅读
        </span>
        <span class="category">
          <i class="fas fa-folder" style="color: pink"></i>
          {{ article.category }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loadingGif from '@/assets/loading.gif'
// 定义文章接口
interface Article {
  id: number
  title: string
  description: string
  coverImage: string
  publishDate: string
  readingTime: number
  category: string
  slug: string
}

// 定义 props 类型
interface Props {
  article: Article
}

// 定义 props
const props = defineProps<Props>()

// 定义状态
const isLoading = ref<boolean>(false)

// 点击处理函数
const handleClick = (): void => {
  // 可以添加路由导航或其他处理逻辑
  console.log('点击了文章:', props.article.slug)
}

// 图片错误处理函数
const handleImageError = (e: Event): void => {
  const target = e.target as HTMLImageElement
  if (!target.src.includes('loading.gif')) {
    isLoading.value = true
    target.src = loadingGif
    target.classList.add('loading-image')
  }
}
</script>

<style scoped>


.article-card {
  background-color: rgba(255, 255, 200, 0.02);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  height: 200px;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 3, 0.5);
}

.article-cover {
  width: 300px;
  min-width: 300px;
  height: 100%;
  overflow: hidden;
  background-color: #2a2a2a;
  position: relative;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-cover img.loading-image {
  width: auto;
  height: auto;
  max-width: 50%;
  max-height: 50%;
  object-fit: contain;
  padding: 20px;
}

.article-card:hover .article-cover img:not(.loading-image) {
  transform: scale(1.05);
}

.article-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-title {
  font-size: 1.5em;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 10px;
  line-height: 1.4;
}

.article-description {
  padding-top: 8%;
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 10px;
  line-height: 1.6;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: pink;
  font-size: 0.9em;
  margin-top: auto;
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.article-meta i {
  font-size: 0.9em;
  color: #666;
}

:deep(.article-meta) {
  font-family: "Caoshu", sans-serif;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
    height: auto;
  }
  
  .article-cover {
    width: 100%;
    height: 160px;
  }
  
  .article-content {
    padding: 15px;
  }
  
  .article-title {
    font-size: 1.1em;
  }
  
  .article-description {
    font-size: 0.85rem;
    line-clamp: 3;
  }

  .article-meta {
    gap: 12px;
    font-size: 0.85em;
  }
}
</style>