import { configureStore } from '@reduxjs/toolkit';

import { reducer as authReducer}  from '../../auth/store/slice';
import { reducer as openDealsReducer } from '../../open-deals/store';

const store = configureStore({
  reducer: {
    auth: authReducer,
    openDeals: openDealsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;