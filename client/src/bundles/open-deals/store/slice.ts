import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '../../common/enums/data-status';
import { type ValueOf } from '../../common/types/value-of.type';
import { OpenDeal } from '../types/open-deal.type';
import { getAll} from './actions';

type State = {
  openDeals: OpenDeal[] | null;
  dataStatus: ValueOf<typeof DataStatus>;
  error: null | Error;
};

const initialState: State = {
  openDeals: null,
  dataStatus: DataStatus.IDLE,
  error: null,
};

const { reducer, actions, name } = createSlice({
  name: 'open-deals',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(getAll.pending), (state) => {
         state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(getAll.fulfilled), (state, action) => {
          state.dataStatus = DataStatus.FULFILLED;
          state.openDeals = action.payload;
      },
    );
    builder.addMatcher(
      isAnyOf( getAll.rejected), (state) => {
          state.dataStatus = DataStatus.FULFILLED;
          state.openDeals = null;
      },
    );
  }
});

export {  reducer, actions, name };