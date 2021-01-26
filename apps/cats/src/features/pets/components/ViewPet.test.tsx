import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { fetchPets, initialState } from '../slice';
import { petsFixture } from '@pets/types';
import { Route } from 'react-router-dom';
import { ViewPet } from './ViewPet';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { getActionResult, renderWithProviders, screen } from '../../../utils/test-utils';

const axiosMock = new MockAdapter(axios);

describe('view pet', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it('can show a loading bar and then a pet', async () => {
    axiosMock.onGet('/api/pets').reply(200, petsFixture);

    const { store } = renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialState: { pets: initialState },
      initialEntries: ['/89222b2d-8d06-41ff-82cf-c989dd90de24']
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(petsFixture[0].name)).toHaveTextContent(petsFixture[0].name);

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchPets.fulfilled.type);
  });

  it('can show a loading bar and then an error', async () => {
    axiosMock.onGet('/api/pets').reply(500);

    const { store } = renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialState: { pets: initialState },
      initialEntries: ['/89222b2d-8d06-41ff-82cf-c989dd90de24']
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();

    const { type } = await getActionResult(store.dispatch);
    expect(type).toEqual(fetchPets.rejected.type);
  });
});
