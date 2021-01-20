import { Action } from 'redux';
import { callbacks as websocketBuilder, connection } from './ws';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { ThunkAction } from 'redux-thunk';
import { websocketMiddleware } from '@pets/core';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      websocketMiddleware({ connection, websocketBuilder })
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
