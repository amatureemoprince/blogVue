<template>
  <div class="article-container">
    <div class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
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

    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Article {
  title: string
  publishDate: string
  readingTime: number
  category: string
  content: string
}

const props = defineProps<{
  article: Article
}>()
</script>

<style scoped>
.article-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 200, 0.02);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.article-header {
  margin-bottom: 2rem;
  text-align: center;
}

.article-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: #e2ff04;
  font-size: 0.9rem;
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.article-content {
  color: #ffffff;
  line-height: 1.8;
  font-size: 1.1rem;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #e2ff04;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
}

.article-content :deep(a) {
  color: #e2ff04;
  text-decoration: none;
}

.article-content :deep(pre) {
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

.article-content :deep(code) {
  font-family: monospace;
}

@media (max-width: 768px) {
  .article-container {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.5rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>
