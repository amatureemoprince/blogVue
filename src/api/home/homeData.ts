import http from '@/utils/http'; // 引入配置好的 Axios 实例

// 获取主页句子内容的 API 请求
export const getHomeSentences = async () => {
    try {
        console.log('开始请求数据...');
        const response = await http.get('/home/sentences');
        console.log('收到响应:', response);
        const data = response.data;
        console.log('处理后的数据:', data);
        return data;
      } catch (error) {
        console.error('请求失败，详细错误:', error);
        throw error;
      }
};






