import { AxiosResponse } from 'axios';

import { axiosWithAuth } from '../../framework/store/api/axios-instances';
import { OpenDealsApiPAth } from '../enums/open-deals-api-path';
import { type OpenDeal } from '../types/open-deal.type';

class OpenDealsApi  {
    async getAll ():Promise<AxiosResponse<OpenDeal[]>> { 
        return await axiosWithAuth.get(
            OpenDealsApiPAth.ROOT );
        }
}

const openDealsApi = new OpenDealsApi();

export { openDealsApi };
