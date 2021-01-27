import axios from "axios";
import Vue from "vue";
import { router } from '@/router'

const httpClient = axios.create({
    baseURL: 'http://localhost:8085/api/cms'
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
    }
    return Promise.resolve(err);
})

export {httpClient}