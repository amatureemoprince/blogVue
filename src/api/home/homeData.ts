import http from '@/utils/http'; // 引入配置好的 Axios 实例

// 获取主页句子内容的 API 请求
export const getHomeSentences = async () => {
    try {
        console.log('开始请求主页展示数据...');
        const response = await http.get('/home/sentences');
        const data = response.data;
        return data;
      } catch (error) {
        console.error('请求失败，详细错误:', error);
        throw error;
      }
};






