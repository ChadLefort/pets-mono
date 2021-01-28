import React from 'react';
import { PetForm } from './Form';
import { withTheme } from '@pet-tracker/utils';

export default {
  component: PetForm,
  title: 'PetForm',
  decorators: [withTheme]
};

export const primary = () => <PetForm onSubmit={(values) => Promise.resolve(console.log(values))} />;
