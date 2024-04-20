import { AxiosResponse } from 'axios';

import { axiosBase, axiosWithAuth } from '../../framework/store/api/axios-instances';
import { type User } from '../../user/types/types';
import { type AuthResponse } from '../types/auth-response.type';
import { type UserSignInRequestDto, type UserSignUpRequestDto } from '../validation/validation';
import { AuthApiPath } from './enums/auth-api-path.enum';

class AuthApi  {
    async login(data: UserSignInRequestDto
      ): Promise<AxiosResponse<AuthResponse>>{

      return await axiosBase.post(AuthApiPath.LOGIN, data);
    }
      
      async register (data: UserSignUpRequestDto
        ): Promise<AxiosResponse<AuthResponse>> {
        return await axiosBase.post( AuthApiPath.REGISTER,
          data
        );
      }

      async getNewTokens (): Promise<AxiosResponse<AuthResponse>> {
        return await axiosBase.post(
           AuthApiPath.TOKEN,
        );
      }

      async logout ():Promise<AxiosResponse<boolean>>{
        return await axiosBase.post(AuthApiPath.LOG_OUT);
      }

      async getUser ():Promise<AxiosResponse<User>> { 
        return await axiosWithAuth.get(
          AuthApiPath.USER );
      }
}

const authApi = new AuthApi();

export { authApi };
