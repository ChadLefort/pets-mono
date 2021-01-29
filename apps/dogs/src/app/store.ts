import { authRootReducer } from '@pet-tracker/auth';
import { configureStore } from '@reduxjs/toolkit';
import { petsRootReducer } from '@pet-tracker/pets';
import { petsWebsocketBuilder } from '@pet-tracker/pets';
import { websocketMiddleware } from '@pet-tracker/utils';

const connection = new WebSocket('ws://localhost:4200/api/ws/pets');

export const store = configureStore({
  reducer: {
    ...authRootReducer,
    ...petsRootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware({ connection, websocketBuilder: petsWebsocketBuilder }))
});
