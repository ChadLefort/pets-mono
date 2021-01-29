import { authRootReducer } from '@pet-tracker/auth';
import { configureStore } from '@reduxjs/toolkit';
import { petsRootReducer } from '@pet-tracker/pets';

export const store = configureStore({
  reducer: {
    ...authRootReducer,
    ...petsRootReducer
  }
});
