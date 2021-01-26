import React from 'react';
import { configureStore, DeepPartial, Dispatch } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { reducer } from 'app/reducer';
import { RootState, store as origStore } from 'app/store';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { act, render as rtlRender, RenderOptions } from '@testing-library/react';

jest.mock('app/store', () => ({
  store: jest.fn()
}));

function configureTestStore(initialState: DeepPartial<RootState> = {}) {
  const store = configureStore({ reducer, preloadedState: initialState });
  const origDispatch = store.dispatch as jest.Mock;

  store.dispatch = jest.fn(origDispatch);
  origStore.getState = () => store.getState();

  return store;
}

type Params = {
  initialState?: DeepPartial<RootState>;
  initialEntries?: string[];
  store?: ReturnType<typeof configureTestStore>;
} & RenderOptions;

export const queryCache = new QueryCache({
  defaultConfig: { queries: { retry: 0 } }
});

export function renderWithProviders(
  ui: React.ReactElement,
  { initialState, initialEntries, store = configureTestStore(initialState), ...renderOptions }: Params
) {
  const history = createMemoryHistory({ initialEntries });
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={store}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Router history={history}>{children}</Router>
      </ReactQueryCacheProvider>
    </Provider>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
    history
  };
}

export async function actWithReturn<T = typeof origStore>(callback: () => unknown) {
  let ret;

  await act(async () => {
    ret = await callback();
  });

  return (ret as unknown) as T;
}

export async function getActionResult<T = unknown>(dispatch: Dispatch, action = 0) {
  const mockDispatch = dispatch as jest.Mock;
  return (await mockDispatch.mock.results[action].value) as {
    type: string;
    payload?: T;
  };
}

export const HooksWrapper: React.FC = ({ children }) => <Provider store={configureTestStore()}>{children}</Provider>;

export * from '@testing-library/react';
