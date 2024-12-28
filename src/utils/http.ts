import axios, { type AxiosInstance, type InternalAxiosRequestConfig, AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

// 定义响应数据的接口
interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

const BASE_URL = '/api';
const TIMEOUT = 10000;
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: HEADERS,
  withCredentials: false,
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('发起请求:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      params: config.params,
      data: config.data
    });
    return config;
  },
  (error: AxiosError) => {
    console.error('请求配置错误:', {
      message: error.message,
      code: error.code,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, msg, data } = response.data;
    
    console.log('http拦截器收到响应:', {
      url: response.config.url,
      status: response.status,
      code,
      msg,
      data
    });

    if (code !== 200) {
      const error = new Error(msg || '操作失败');
      (error as any).code = code;
      (error as any).data = data;
      console.error('业务错误:', error);
      return Promise.reject({ code, msg, data });
    }

    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    const errorResponse: ApiResponse = {
      code: 500,
      msg: '服务器错误',
      data: null
    };

    if (error.response) {
      // 服务器返回错误状态码
      const responseData = error.response.data;
      errorResponse.code = responseData?.code || error.response.status;
      errorResponse.msg = responseData?.msg || `请求失败: ${error.response.status}`;
      errorResponse.data = responseData?.data || null;
    } else if (error.request) {
      // 请求已发出但未收到响应
      errorResponse.code = 504;
      errorResponse.msg = '服务器未响应，请检查网络连接';
      errorResponse.data = null;
    } else {
      // 请求配置出错
      errorResponse.code = 400;
      errorResponse.msg = '请求配置错误: ' + error.message;
      errorResponse.data = null;
    }

    console.error('请求失败:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      error: errorResponse,
      originalError: {
        message: error.message,
        code: error.code,
        name: error.name
      }
    });

    return Promise.reject(errorResponse);
  }
);

export default http;