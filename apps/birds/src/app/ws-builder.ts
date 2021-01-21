import { fetchNewPets } from 'features/pets/slice';
import { fetchNewTitle } from 'features/layout/slice';
import { websocketBuilder } from '@pets/core';
import {
  IPet,
  PetsWebSocketActions,
  LayoutWebSocketActions,
} from '@pets/types';

export const callbacks = websocketBuilder()
  .add(
    PetsWebSocketActions.NewPet,
    (payload: IPet) => (dispatch, store, sendMessage) => {
      dispatch(fetchNewPets(payload));
      sendMessage({ action: PetsWebSocketActions.NewPetSuccess });
    }
  )
  .add(
    LayoutWebSocketActions.NewTitle,
    (payload: string) => (dispatch, store, sendMessage) => {
      dispatch(fetchNewTitle(payload));
    }
  );
