import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { DataStatus } from "../../common/enums/data-status";
import { type ValueOf } from "../../common/types/value-of.type";
import { type User } from "../../user/types/user.type";
import { login, register, logout, getNewTokens, getUser } from './actions';

type State = {
  user: User | null;
  dataStatus: ValueOf<typeof DataStatus>;
  error: null | Error;
};

const initialState: State = {
  user: null,
  dataStatus: DataStatus.IDLE,
  error: null,
};

const { reducer, actions, name } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<User | null>,
    ) => {
        state.user = action.payload;
    },
    setError: (state, action: PayloadAction<Error | null>) => {
        state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(
          login.pending,
          register.pending,
          getUser.pending,
          getNewTokens.pending,
          logout.pending,
      ),
      (state) => {
          state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(
          login.fulfilled,
          register.fulfilled,
          getUser.fulfilled,
          getNewTokens.fulfilled,
      ),
      (state, action) => {
          state.dataStatus = DataStatus.FULFILLED;
          state.user = action.payload;
      },
    );
    builder.addMatcher(
      isAnyOf( logout.fulfilled), (state) => {
          state.dataStatus = DataStatus.FULFILLED;
          state.user = null;
      },
    );
    builder.addMatcher(
      isAnyOf(
          login.rejected,
          register.rejected,
          getUser.rejected,
          getNewTokens.rejected,
      ),
      (state, action) => {
          state.dataStatus = DataStatus.REJECTED;
          state.error = action.payload as Error;
          state.user = null;
      },
    );
  }
});

export {  reducer, actions, name };