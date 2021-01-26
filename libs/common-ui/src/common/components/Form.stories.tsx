import React from 'react';
import { PetForm } from './Form';

export default {
  component: PetForm,
  title: 'PetForm',
};

export const primary = () => {
  return (
    <PetForm onSubmit={(values) => Promise.resolve(console.log(values))} />
  );
};
