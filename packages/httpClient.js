import axios from "axios";
import Vue from "vue";
import { router } from '@/router'

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

Vue.prototype.$axios = httpClient
window.axios = httpClient

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization =  token;
    }

    return config;
});

httpClient.interceptors.response.use(data=> {
    return data.data;
}, err=> {
    if (err.response.status == 401) {
        router.push({
            path: `/login`,
        })
        return new Promise(() => {}) // pending的promise，中止promise链
    } else if (err.response.status >= 400) {
        Vue.prototype.$message.error(err.response.data.msg);
    }
    return Promise.reject(err);
})

export {httpClient}