import { fetchNewPets } from 'features/pets/pets.slice';
import { fetchNewTitle } from 'features/layout/layout.slice';
import { IPet, LayoutWebSocketActions, PetsWebSocketActions } from '@pets/types';
import { websocketBuilder } from '@pets/core';

export const callbacks = websocketBuilder()
  .add(PetsWebSocketActions.NewPet, (payload: IPet) => (dispatch, store, sendMessage) => {
    dispatch(fetchNewPets(payload));
    sendMessage({ action: PetsWebSocketActions.NewPetSuccess });
  })
  .add(LayoutWebSocketActions.NewTitle, (payload: string) => (dispatch, store, sendMessage) => {
    dispatch(fetchNewTitle(payload));
  });
