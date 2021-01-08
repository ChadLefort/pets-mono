import { AppDispatch, RootState } from './store';
import { combineReducers } from '@reduxjs/toolkit';
import { coreRootReducer } from '@pets/core';
import { createSelectorHook, useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector = createSelectorHook<RootState>();

export const reducer = {
  core: combineReducers(coreRootReducer),
};
