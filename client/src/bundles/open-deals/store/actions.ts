import { createAsyncThunk } from '@reduxjs/toolkit';

import { openDealsApi } from '../api/open-deals.api';

    const  getAll = createAsyncThunk(
        'open-deals', async () => {
          const { data }  = await openDealsApi.getAll();

          return data;
    });

export { getAll };