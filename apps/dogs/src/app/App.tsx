import React from 'react';
import { Auth } from '@pets/core';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Layout } from '@pets/common-ui';
import { Provider } from 'react-redux';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Routes } from './Routes';
import { store } from './store';
import { teal } from '@material-ui/core/colors';
import { Theme } from '@pets/common-ui';

export const App: React.FC = () => {
  const queryCache = new QueryCache();

  return (
    <Provider store={store}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryDevtools />
        <Router>
          <Theme primaryColor={teal[900]}>
            <Auth>
              <Layout title="Dogs">
                <Routes />
              </Layout>
            </Auth>
          </Theme>
        </Router>
      </ReactQueryCacheProvider>
    </Provider>
  );
};
