import { useConfigToken } from '@/store/login';
import axios from 'axios';

export const isSuccess = (code) => {
  return ['200', 200].includes(code);
};

export const isUnLogin = (code) => {
  return ['100005', 100005].includes(code);
};

export const updateUrl = '';

const instance = axios.create({
  baseURL: 'http://47.121.126.205:8099/file-api/v1', //'http://www.shantu.top:8099/file-api/v1', // //'https://some-domain.com/api/',
  // baseURL: 'http://www.shantu.top/file-api/v1',
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject({
      code: error.response.data.status,
      data: error.response.data.error || '网络错误，请稍后重试',
    });
  },
);

export const posApi = (url: string, data?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { getToken } = useConfigToken();
    const token = getToken();
    const axiosOptions = {
      url: url,
      method: 'post',
      data: Object.assign({ ...data }),
      headers: {
        token,
      },
    };
    instance
      .request(axiosOptions)
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};

export const getApi = (url: string, data?: any): Promise<any> => {
  // 与业务无关的异常将在这里处理
  return new Promise((resolve, reject) => {
    const { getToken } = useConfigToken();
    const token = getToken();
    const axiosOptions = {
      url: url,
      method: 'get',
      params: data,
      headers: {
        token,
      },
    };
    instance
      .request(axiosOptions)
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};
