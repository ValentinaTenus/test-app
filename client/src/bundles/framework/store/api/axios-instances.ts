import axios, { CreateAxiosDefaults } from 'axios';

import { authApi } from '~/bundles/auth/api/auth-api';
import { getAccessToken, removeFromStorage } from '~/bundles/auth/api/auth-token.service';

import { errorCatch } from './catch-error';

const options: CreateAxiosDefaults = {
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-Type": 'application/json',
    },
    withCredentials: true
}

const axiosBase = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken();

    if(config?.headers && accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;

        if((error?.response?.status === 401 ||
            errorCatch(error) === 'jwt expired' ||
            errorCatch(error) === 'jwt mut be provided') &&
            error.config &&
            !error.config._isRetry
        ){
            originalRequest._isRetry = true;

            try {
                authApi.getNewTokens();
                
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if(errorCatch(error) === 'jwt expired') removeFromStorage()
            }
        }
        throw error
    }
)

export { axiosBase, axiosWithAuth };
