import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHomeArticles } from '@/api/home/homeArticles';

// 定义文章标签类型
type Label = string;

// 定义文章接口
interface Article {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  createTime: string;
  readingTime: number;
  category: string;
  labels: Label[];
  likes?: number;
  views?: number;
  comments?: number;
  collections?: number;
}

// 定义分页数据接口
interface PaginationData {
  records: Article[];
  currentPageNum: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

// 创建 Article Store
export const useArticleStore = defineStore('article', () => {
  // 状态定义
  const articles = ref<Article[]>([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalPages = ref(0);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 获取文章列表
  const fetchArticles = async (pageNum: number, pageSize: number) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getHomeArticles(pageNum, pageSize);
      console.log('API响应:', response); // 添加日志
      
      if (response.code === 200) {
        updateArticleList(response.data);
        console.log('更新后的数据:', {
          articles: articles.value,
          total: total.value,
          currentPage: currentPage.value
        });
      } else {
        error.value = '获取文章列表失败';
        console.error("API返回错误:", response);
      }
    } catch (err) {
      error.value = '获取文章列表失败';
      console.error("API请求错误:", err);
    } finally {
      loading.value = false;
    }
  };

  // 更新文章列表数据
  const updateArticleList = (data: PaginationData) => {
    articles.value = data.records;
    currentPage.value = data.currentPageNum;
    pageSize.value = data.pageSize;
    totalPages.value = data.totalPages;
    total.value = data.total;
    
    console.log('更新列表数据:', {
      articlesLength: articles.value.length,
      total: total.value,
      totalPages: totalPages.value
    });
  };

  return {
    // 状态
    articles,
    currentPage,
    pageSize,
    totalPages,
    total,
    loading,
    error,
    // 方法
    fetchArticles,
    updateArticleList
  };
});