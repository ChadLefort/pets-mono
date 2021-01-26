import React from 'react';
import { Layout as CommonLayout } from '@pets/common-ui';
import { useTypedSelector } from 'app/reducer';

export const Layout: React.FC = ({ children }) => {
  const { title } = useTypedSelector((state) => state.layout);
  return <CommonLayout title={title || 'Birds'}>{children}</CommonLayout>;
};
