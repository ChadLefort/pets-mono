import React from 'react';
import { Layout } from './Layout';
import { withTheme } from '../utils/storybook-decorators';

export default {
  component: Layout,
  title: 'Layout',
  decorators: [withTheme]
};

export const primary = () => <Layout />;
