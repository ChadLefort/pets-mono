import { AppDispatch, RootState } from './store';
import { authReducer } from '@pets/core';
import { combineReducers } from '@reduxjs/toolkit';
import { createSelectorHook, useDispatch } from 'react-redux';
import { petsReducer } from '../features/pets/pets.slice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();

export const reducer = {
  core: combineReducers({ auth: authReducer }),
  pets: petsReducer
};
