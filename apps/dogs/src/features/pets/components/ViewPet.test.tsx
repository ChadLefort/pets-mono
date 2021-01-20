import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { petsFixture } from '@pets/types';
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
    axiosMock.onGet('/api/pets/56d35640-008b-4022-bb4a-ebba0c78f6b3').reply(
      200,
      petsFixture.find(
        ({ id }) => id === '56d35640-008b-4022-bb4a-ebba0c78f6b3'
      )
    );

    renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialEntries: ['/56d35640-008b-4022-bb4a-ebba0c78f6b3'],
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText(petsFixture[1].name)).toHaveTextContent(
      petsFixture[1].name
    );
  });

  it('can show a loading bar and then an error', async () => {
    axiosMock
      .onGet('/api/pets/56d35640-008b-4022-bb4a-ebba0c78f6b3')
      .reply(500);

    renderWithProviders(<Route path="/:id" component={ViewPet} />, {
      initialEntries: ['/56d35640-008b-4022-bb4a-ebba0c78f6b3'],
    });

    expect(screen.getByRole('progressbar')).toBeDefined();

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByTitle('Error')).toBeDefined();
  });
});
