import React, { Reducer } from 'react';
import { AddPets } from './AddPets';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { PetType } from '@pet-tracker/types';
import { withProvider } from '@pet-tracker/utils';
import { withTheme } from '@pet-tracker/common-ui';

export default {
  component: AddPets,
  title: 'AddPets',
  decorators: [withTheme, withProvider<RootState>(petsRootReducer)]
};

export const primary = () => <AddPets type={PetType.Cat} />;
