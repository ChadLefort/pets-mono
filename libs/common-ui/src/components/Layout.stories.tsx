import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';
import { withTheme } from '@pet-tracker/utils';

export default {
  component: Layout,
  title: 'Layout',
  decorators: [withTheme]
};

export const primary = () => (
  <Router>
    <Layout title="Some App" />
  </Router>
);
