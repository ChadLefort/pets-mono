import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { addPet, initialState } from '../slice';
import { AddPets } from './AddPets';
import { fireEvent, screen } from '@testing-library/react';
import { IPet } from '@pets/types';
import {
  actWithReturn,
  getActionResult,
  renderWithProviders,
} from 'utils/test-utils';

const axiosMock = new MockAdapter(axios);

describe('add pets', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('should call dispatch pets/addPet action when form is submitted', async () => {
    const newPet: IPet = {
      id: '89222b2d-8d06-41ff-82cf-c989dd90de24',
      name: 'Pat',
      age: '7',
      type: 'Bird',
    };

    axiosMock.onPost('/api/pets').reply(200, newPet);

    const store = await actWithReturn(async () => {
      const { store } = renderWithProviders(<AddPets />, {
        initialState: { pets: initialState },
      });

      fireEvent.change(screen.getByTestId('name'), {
        target: { value: 'Pat' },
      });
      fireEvent.change(screen.getByTestId('age'), { target: { value: '7' } });
      fireEvent.click(screen.getByText('Submit'));

      return store;
    });

    const { type, payload } = await getActionResult(store.dispatch);

    expect(type).toEqual(addPet.fulfilled.type);
    expect(payload).toEqual(newPet);
  });
});
