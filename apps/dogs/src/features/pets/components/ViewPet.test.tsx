import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture } from '../fixtures';
import { queryCache, renderWithProviders, screen } from 'utils/test-utils';
import { Route } from 'react-router-dom';
import { ViewPet } from './ViewPet';
import { waitForElementToBeRemoved } from '@testing-library/react';

const axiosMock = new MockAdapter(axios);

describe('view pet', () => {
  beforeEach(() => {
    axiosMock.reset();
    queryCache.clear();
  });

  it('can show a loading bar and then a pet', async () => {
    axiosMock.onGet('/api/pets/1').reply(
      200,
      petsFixture.find(({ id }) => id === 1)
    );

    renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialEntries: ['/1'],
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(petsFixture[0].name)).toHaveTextContent(
      petsFixture[0].name
    );
  });

  it('can show a loading bar and then an error', async () => {
    axiosMock.onGet('/api/pets/1').reply(500);

    renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialEntries: ['/1'],
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();
  });
});
