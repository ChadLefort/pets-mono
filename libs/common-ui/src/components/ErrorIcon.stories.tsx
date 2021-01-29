import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { withTheme } from '../utils/storybook-decorators';

export default {
  component: ErrorIcon,
  title: 'ErrorIcon',
  decorators: [withTheme]
};

export const primary = () => <ErrorIcon />;
