import React from 'react';
import { Auth } from '@pet-tracker/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '@pet-tracker/common-ui';
import { Nav } from '@pet-tracker/nav';
import { orange } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { Routes } from './Routes';
import { store } from './store';
import { Theme } from '@pet-tracker/common-ui';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Theme primaryColor={orange[400]}>
        <Auth>
          <Layout nav={<Nav title="Cats" />}>
            <Routes />
          </Layout>
        </Auth>
      </Theme>
    </Router>
  </Provider>
);
