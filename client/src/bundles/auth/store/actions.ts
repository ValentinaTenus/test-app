import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { removeFromStorage, saveTokenStorage } from '../../auth/api/auth-token.service';
import { type User } from '../../user/types/types';
import { authApi } from '../api/auth-api';
import { type UserSignInRequestDto, type UserSignUpRequestDto } from '../validation/validation';

    const login = createAsyncThunk<
        User, 
        UserSignInRequestDto, 
        {
            rejectValue: {message: string};
        }
    >('login', async (data: UserSignInRequestDto, { rejectWithValue }
        ) => {
            try {
                const response = await authApi.login(data);
                const { user, accessToken } = response.data;
        
                if(accessToken) saveTokenStorage(accessToken)
              
                return user;
            } catch (error: unknown) {
                const { response } = error as AxiosError;
                const message = response?.data as { message: string}
                return rejectWithValue(message);
            } 
      });
      
    const register = createAsyncThunk<
        User, 
        UserSignUpRequestDto, 
        {
            rejectValue: {message: string};
        }
    >('register', async (
        data: UserSignUpRequestDto, { rejectWithValue }
        ) => {
            try {
                const response = await authApi.register(data);
                const { user, accessToken } = response.data;
             
                if(accessToken) saveTokenStorage(accessToken)
                   
                 return user;
            } catch (error: unknown) {
                const { response } = error as AxiosError;
                const message = response?.data as { message: string}
                return rejectWithValue(message);
            }   
      });

    const getNewTokens = createAsyncThunk('tokens', async (
        ): Promise<User> => {
        const response = await authApi.getNewTokens();
        const { user, accessToken } = response.data;

        if(accessToken) saveTokenStorage(accessToken)
       
         return user;
      });

    const logout = createAsyncThunk('logout', async (): Promise<boolean> => {
        const { data } = await authApi.logout();
      
        if(data){
            removeFromStorage();
        }

        return data;
    });

    const  getUser = createAsyncThunk(
        'user/profile', async () => {
          const { data }  = await authApi.getUser();

          return data;
    });

export { login, logout, register, getNewTokens, getUser };