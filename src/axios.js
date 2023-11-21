// src/axios.js

import axios from 'axios';

// 创建一个axios实例并配置基本URL
const instance = axios.create({
    baseURL: 'http://localhost:8080', // 后端接口的基本URL
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // 获取令牌
        if (token) {
            config.headers['Authorization'] = `${token}`; // 在请求头中添加令牌
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;
