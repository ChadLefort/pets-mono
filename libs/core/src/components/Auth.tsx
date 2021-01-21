import React, { useEffect } from 'react';
import { Box, Container, LinearProgress } from '@material-ui/core';
import { ErrorIcon } from '@pets/common-ui';
import { fetchAuthToken } from '../slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../slices/reducer';

export const Auth: React.FC = ({ children }) => {
  const { isFetching, ssoToken, error } = useTypedSelector(
    (state) => state.core.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthToken());
  }, [dispatch]);

  return !isFetching && ssoToken ? (
    (children as JSX.Element)
  ) : error ? (
    <ErrorIcon />
  ) : (
    <Container>
      <Box margin={2}>
        <LinearProgress />
      </Box>
    </Container>
  );
};
