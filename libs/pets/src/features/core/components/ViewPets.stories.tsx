import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture, PetType } from '@pet-tracker/types';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { ViewPets } from './ViewPets';
import { withMock, withProvider, withRouter } from '@pet-tracker/utils';
import { withTheme } from '@pet-tracker/common-ui';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/pets').reply(200, petsFixture);
};

export default {
  component: ViewPets,
  title: 'ViewPets',
  decorators: [withTheme, withProvider<RootState>(petsRootReducer), withRouter(['/']), withMock(mock)]
};

export const primary = () => <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />;
