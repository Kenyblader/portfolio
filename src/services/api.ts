import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { authHook } from "../utils/hooks/authHook";
import { loadingService } from "./loading.service";
import { messagingService } from "./messaging.service";

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
        // messagingService.addMessage("Request successful", "success");
        return response;
    },
    async (error:AxiosError)=>{
        loadingService.hide();
        if(error.response?.status===401 ){
            authHook.logOut();
            messagingService.addMessage("Session expired. Please log in again.", "error");
        }
        if(error.response?.status=== 404 ){
            messagingService.addMessage("ce service n'est pas disponible", "info");
        }
        else
            messagingService.addMessage(`desole une erreur est survenue`, "error");

    }
)

export default api;