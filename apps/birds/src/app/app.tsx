import React from 'react';
import { Auth } from '@pets/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';
import { Provider } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { Routes } from './Routes';
import { store } from './store';
import { Theme } from '@pets/common-ui';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Theme primaryColor={red[400]}>
        <Auth>
          <Layout>
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Provider>
);
