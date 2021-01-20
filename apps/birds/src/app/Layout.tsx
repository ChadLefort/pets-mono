import React from 'react';
import { Layout as CommonLayout } from '@pets/common-ui';
import { useTypedSelector } from './reducer';

export const Layout: React.FC = ({ children }) => {
  const { title } = useTypedSelector((state) => state.pets);

  return <CommonLayout title={title || 'Birds'}>{children}</CommonLayout>;
};
