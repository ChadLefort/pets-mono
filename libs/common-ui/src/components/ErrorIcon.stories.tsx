import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { withTheme } from '@pet-tracker/utils';

export default {
  component: ErrorIcon,
  title: 'ErrorIcon',
  decorators: [withTheme]
};

export const primary = () => <ErrorIcon />;
