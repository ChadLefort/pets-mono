import React, { useEffect } from 'react';
import { Box, Container, LinearProgress } from '@material-ui/core';
import { ErrorIcon } from '@pets/common-ui';
import { fetchAuthToken } from '../auth.slice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../common/reducer';

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
