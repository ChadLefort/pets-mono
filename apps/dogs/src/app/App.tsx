import React from 'react';
import { Auth } from '@pets/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from '@pets/common-ui';
import { Provider } from 'react-redux';
import { Routes } from './Routes';
import { store } from './store';

export const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Auth>
        <Layout title="Dogs">
          <Routes />
        </Layout>
      </Auth>
    </Router>
  </Provider>
);
