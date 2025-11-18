import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authHook } from "../utils/authHook";
import { loadingService } from "./loading.service";

const url=process.env.REACT_APP_API
console.log('rul:',url)
const api= axios.create({
    baseURL: url,
    timeout: 10000,
});

api.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        loadingService.show();
        const tocken=authHook.getToken();
        if(tocken && config.headers)
            config.headers.Authorization= `Bearer ${tocken}`
        return config;
    },
    (error:AxiosError)=>{
        loadingService.show();
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response)=>{
        loadingService.hide()
        return response;
    },
    async (error:AxiosError)=>{
        loadingService.hide();
        if(error.response?.status===401 ){
            authHook.logOut();
        }
    }
)

export default api;