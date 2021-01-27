import { createSlice } from '@reduxjs/toolkit';

const name = 'app/birds/layout';

type State = { title: string | null };

export const initialState: State = {
  title: null
};

const layout = createSlice({
  name,
  initialState,
  reducers: {
    fetchNewTitle(state, action) {
      state.title = action.payload;
    }
  }
});

export const {
  actions: { fetchNewTitle },
  reducer: layoutReducer
} = layout;
