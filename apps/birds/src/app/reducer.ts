import { AppDispatch, RootState } from './store';
import { authReducer } from '@pets/core';
import { combineReducers } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { layoutReducer } from 'features/layout/layout.slice';
import { petsReducer } from '../features/pets/pets.slice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();

export const reducer = {
  core: combineReducers({ auth: authReducer }),
  layout: layoutReducer,
  pets: petsReducer
};
