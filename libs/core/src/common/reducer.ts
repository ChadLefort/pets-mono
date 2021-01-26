import { Action, combineReducers, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/auth.slice';
import { createSelectorHook } from 'react-redux';

const coreRootReducer = {
  auth: authReducer,
};

// just for CoreRootState type
const coreRootReducerType = combineReducers({
  core: combineReducers(coreRootReducer),
});

export type CoreRootState = ReturnType<typeof coreRootReducerType>;
export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  CoreRootState,
  unknown,
  Action<string>
>;

export const useTypedSelector = createSelectorHook<CoreRootState>();
