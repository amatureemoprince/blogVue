
import http from '@/utils/http'; // 引入之前配置好的 Axios 实例

// 定义 Register 数据的接口
interface Register {
  id: number;
  registerNum: number;
  createTime: string;
}

// 定义 API 响应的接口
interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 获取注册信息的 API 请求
export const getRegisterData = async (): Promise<Register[]> => {
  try {
    const response = await http.get<ApiResponse<Register[]>>('/getRegister');
    if (response.data.code !== 200) {
      throw new Error(response.data.msg || '获取注册信息失败');
    }
    return response.data.data;
  } catch (error) {
    console.error('获取注册信息失败:', error);
    throw error;
  }
};
