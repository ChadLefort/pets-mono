import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import { ErrorIcon } from '@pet-tracker/common-ui';
import { fetchAuthToken } from '../auth.slice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../common/reducer';

export const Auth: React.FC = ({ children }) => {
  const { isFetching, ssoToken, error } = useTypedSelector((state) => state.auth.core);
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
