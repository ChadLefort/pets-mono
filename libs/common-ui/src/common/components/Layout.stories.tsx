import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';

export default {
  component: Layout,
  title: 'Layout',
};

export const primary = () => {
  return (
    <Router>
      <Layout title="Some App" />
    </Router>
  );
};
