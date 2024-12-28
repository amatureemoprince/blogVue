import http from '@/utils/http'; 
export const getHomeArticles = async (pageNum: number,
   pageSize: number) => {
    try {
        console.log('开始请求主页展示文章数据...');
        const response = await http.post('/home/articles',{
            pageNum: pageNum,
            pageSize: pageSize
        });
        const data = response.data;
        return data;
      } catch (error) {
        console.error('请求失败，详细错误:', error);
        throw error;
      }
};