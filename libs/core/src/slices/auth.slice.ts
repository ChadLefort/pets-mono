import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { error, isFetching, State as CommonState } from './common.slice';

const name = 'lib/core/auth';

export const fetchAuthToken = createAsyncThunk(
  `${name}/fetchToken`,
  async () => {
    const { data } = await axios.get<{ ssoToken: string | null }>('/api/auth');
    return data.ssoToken;
  }
);

type State = { ssoToken: string | null } & CommonState;

export const initialState: State = {
  isFetching: false,
  ssoToken: null,
  error: null,
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, isFetching)
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.isFetching = false;
        state.ssoToken = action.payload;
      })
      .addCase(fetchAuthToken.rejected, error);
  },
});

export const { reducer: authReducer } = authSlice;
