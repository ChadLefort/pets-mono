import { AppDispatch, RootState } from './store';
import { authRootReducer } from '@pet-tracker/auth';
import { createSelectorHook, useDispatch } from 'react-redux';
import { petsRootReducer } from '@pet-tracker/pets';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();

export const reducer = {
  ...authRootReducer,
  ...petsRootReducer
};
