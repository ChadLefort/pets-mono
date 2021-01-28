import { AppDispatch, RootState } from './store';
import { authRootReducer } from '@pets/auth';
import { createSelectorHook, useDispatch } from 'react-redux';
import { petsRootReducer } from '@pets/pets';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();

export const reducer = {
  ...authRootReducer,
  ...petsRootReducer
};
