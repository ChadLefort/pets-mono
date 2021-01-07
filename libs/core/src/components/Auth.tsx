import React, { useEffect } from 'react';
import { fetchAuthToken } from '../lib/auth.slice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../lib/reducer';

export const Auth: React.FC = ({ children }) => {
  const { isFetching, error } = useTypedSelector((state) => state.core.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthToken());
  }, []);

  return !isFetching ? (
    <React.Fragment>{children}</React.Fragment>
  ) : error ? (
    <p>Error</p>
  ) : (
    <p>Loading</p>
  );
};
