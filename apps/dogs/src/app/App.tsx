import React from 'react';
import { Auth } from '@pets/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Theme } from '@pets/common-ui';
import { Provider } from 'react-redux';
import { red } from '@material-ui/core/colors';
import { Routes } from './Routes';
import { store } from './store';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Theme primaryColor={red[400]}>
        <Auth>
          <Layout title="Dogs">
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Provider>
);
