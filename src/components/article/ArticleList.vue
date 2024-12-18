<template>
  <div class="main-container">
    <!-- 左侧文章列表 -->
    <div class="articles-section">
      <div class="articles-container">
        <ArticleCard 
          v-for="article in articles" 
          :key="article.id" 
          :article="article"
        />
      </div>
    </div>
    <!-- 右侧信息栏 -->
    <div class="sidebar">
      <SidebarNotice 
        :profile="profile"
        :notice="notice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ArticleCard from '@/components/article/ArticleCard.vue'
import SidebarNotice from '@/components/sidebar/SidebarNotice.vue'

const articles = [
  // 文章数据
  { id: 1, title: 'Vue3 组件开发实践', description: '本文介绍了Vue3组件开发的最佳实践和常用技巧...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-15', readingTime: 5, category: '前端开发', slug: 'vue3-component-development' },
  { id: 2, title: 'TypeScript 高级特性详解', description: '深入探讨TypeScript的高级类型、泛型、装饰器等特性...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-12', readingTime: 8, category: '编程语言', slug: 'typescript-advanced-features' },
  { id: 3, title: '现代化前端构建工具对比', description: '详细对比Vite、Webpack、Rollup等主流构建工具的优劣势...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-10', readingTime: 6, category: '工具效率', slug: 'frontend-build-tools-comparison' },
  { id: 4, title: 'Docker容器化部署实战指南', description: '从零开始学习Docker容器化技术，包括镜像构建、容器编排...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-08', readingTime: 10, category: '运维部署', slug: 'docker-deployment-guide' },
  { id: 5, title: 'React性能优化最佳实践', description: '深入探讨React应用的性能优化技巧，包括虚拟列表、懒加载...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-05', readingTime: 8, category: '前端开发', slug: 'react-performance-optimization' },
  { id: 6, title: 'MongoDB高级查询和索引优化', description: '详解MongoDB的高级查询技巧、索引设计原则...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2024-01-03', readingTime: 7, category: '数据库', slug: 'mongodb-advanced-queries' },
  { id: 7, title: '微服务架构设计实践', description: '探讨微服务架构的设计原则、服务拆分策略...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2023-12-30', readingTime: 12, category: '架构设计', slug: 'microservice-architecture-practice' },
  { id: 8, title: 'AI辅助编程工具探索', description: '全面介绍当前流行的AI编程助手，包括GitHub Copilot...', coverImage: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/1a5a02f8-252c-446d-8b0c-0596e7d9fe29.jpg', publishDate: '2023-12-28', readingTime: 6, category: '开发工具', slug: 'ai-programming-tools' }
]

const profile = {
  name: 'Lj',
  avatar: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/95520dd8-c8d8-4ebf-9807-ea166a7bcf56.jpg',
  bio: 'A Simple and Card UI Design theme for Hexo',
  posts: 22,
  tags: 12,
  categories: 6,
  github: 'https://github.com/amatureemoprince'
}

const notice = '如果你在使用中遇到问题，请到 Github Issues 进行反馈...'

onMounted(() => {
  console.log("正在加载下半部分")
  console.log("ArticleList文章列表数据:", articles)
})
</script>

<style scoped>
.main-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  position: relative;
  z-index: 1;
  border-radius: 8px;
  min-height: 100vh;
}

.main-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/images/black.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.articles-section {
  display: flex;
  justify-content: flex-end;
  padding-right: 40px;
  width: 100%;
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.02);
}

/* 固定 ArticleCard 组件的大小 */
:deep(.article-card) {
  width: 120%;
  max-width: 1000px;
  height: 250px; /* 固定高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
}

@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
}
</style>