<template>
  <div class="main-container">
    <div class="articles-section">
      <div class="articles-container">
        <ArticleCard 
          v-for="article in articleStore.articles" 
          :key="article.id" 
          :article="article"
        />
        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination
            background
            v-model:current-page="currentPage"
            :page-size="10"
            :total="articleStore.total"
            :pager-count="articleStore.totalPages"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            class="custom-pagination"
          />
        </div>
      </div>
    </div>
    <div class="sidebar">
      <SidebarNotice 
        :profile="profile"
        :notice="notice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useArticleStore } from '@/store/article';
import ArticleCard from '@/components/article/ArticleCard.vue';
import SidebarNotice from '@/components/sidebar/SidebarNotice.vue';

// 使用 Pinia store
const articleStore = useArticleStore();

// 当前页码
const currentPage = ref(1);

const profile = {
  name: 'Lj',
  avatar: 'https://doctorpicture.oss-cn-beijing.aliyuncs.com/avatar/95520dd8-c8d8-4ebf-9807-ea166a7bcf56.jpg',
  bio: 'A Simple and Card UI Design theme for Hexo',
  posts: 22,
  tags: 12,
  categories: 6,
  github: 'https://github.com/amatureemoprince'
};

const notice = '如果你在使用中遇到问题，请到 Github Issues 进行反馈...';

// 处理页码变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchArticlesData();
};

// 获取文章数据的方法
const fetchArticlesData = async () => {
  await articleStore.fetchArticles(currentPage.value, 10);
};

// 监听数据变化
watchEffect(() => {
  console.log("分页数据:", {
    total: articleStore.total,
    currentPage: currentPage.value,
    articles: articleStore.articles.length
  });
});
onMounted(async () => {
  await fetchArticlesData();
});
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
  height: 250px;
  overflow: hidden;
}

.sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
}

/* 分页容器样式 */
.pagination-container {
  width: 100%;
  color: red;
  margin-top: 30px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 分页组件样式 */
:deep(.custom-pagination) {
  --el-pagination-bg-color: transparent;
  --el-pagination-text-color: #606266;
  --el-pagination-button-color: #606266;
  --el-pagination-button-bg-color: #fff;
  --el-pagination-button-disabled-color: #c0c4cc;
  --el-pagination-hover-color: #64c5ba;
}

:deep(.custom-pagination .el-pager li) {
  background-color: #fff;
  color: #606266;
  border: none;
  margin: 0 4px;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

:deep(.custom-pagination .el-pager li.is-active) {
  background-color: #64c5ba;
  color: #fff;
  font-weight: normal;
}

:deep(.custom-pagination .btn-prev),
:deep(.custom-pagination .btn-next) {
  background-color: #fff;
  color: #606266;
  border: none;
  padding: 0 12px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.custom-pagination .el-pager li:not(.is-active):hover),
:deep(.custom-pagination .btn-prev:hover),
:deep(.custom-pagination .btn-next:hover) {
  color: #64c5ba;
  background-color: #fff;
}

:deep(.custom-pagination .btn-prev.is-disabled),
:deep(.custom-pagination .btn-next.is-disabled) {
  background-color: #f4f4f5;
  color: #c0c4cc;
  box-shadow: none;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }

  .articles-section {
    padding-right: 0;
  }

  .articles-container {
    padding: 10px;
  }

  :deep(.article-card) {
    width: 100%;
    height: auto;
    min-height: 200px;
  }

  .pagination-container {
    margin-top: 20px;
    padding: 15px 0;
  }

  :deep(.custom-pagination .el-pager li) {
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
  }
}
</style>