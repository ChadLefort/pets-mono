import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React, { useEffect } from 'react';
import { configureStore, DeepPartial, Reducer } from '@reduxjs/toolkit';
import { Layout, Theme } from '@pet-tracker/common-ui';
import { MemoryRouter } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import { Provider } from 'react-redux';

export const withTheme = (story: () => React.ReactNode) => <Theme primaryColor={orange[400]}>{story()}</Theme>;

export const withLayoutAndTheme = (story: () => React.ReactNode) => (
  <Theme primaryColor={orange[400]}>
    <Layout title="Storybook">{story()}</Layout>
  </Theme>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withProvider<T, R extends Reducer = any>(
  rootReducer: R,
  initialState?: DeepPartial<T>,
  store = configureStore({ reducer: rootReducer, preloadedState: initialState })
) {
  return (story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>;
}

export const withRouter = (initialEntries?: string[]) => (story: () => React.ReactNode) => (
  <MemoryRouter initialEntries={initialEntries}>{story()}</MemoryRouter>
);
export const withMock = (mock: (adapter: MockAdapter) => void) => (story: () => React.ReactNode) => {
  const apiMock = new MockAdapter(axios);

  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });

  return story();
};
