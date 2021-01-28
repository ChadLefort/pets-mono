import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture, PetType } from '@pet-tracker/types';
import { petsRootReducer, RootState } from '../../../common/reducer';
import { Route } from 'react-router-dom';
import { ViewPet } from './ViewPet';
import { withMock, withProvider, withRouter, withTheme } from '@pet-tracker/utils';

const mock = (axiosMock: MockAdapter) => {
  axiosMock.onGet('/api/pets').reply(200, petsFixture);
};

export default {
  component: ViewPet,
  title: 'ViewPet',
  decorators: [
    withTheme,
    withProvider<RootState>(petsRootReducer),
    withRouter(['/89222b2d-8d06-41ff-82cf-c989dd90de24']),
    withMock(mock)
  ]
};

export const primary = () => <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />;
