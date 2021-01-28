import { fetchNewPets } from './pets.slice';
import { IPet, PetsWebSocketActions } from '@pet-tracker/types';
import { websocketBuilder } from '@pet-tracker/utils';

export const petsWebsocketBuilder = websocketBuilder().add(
  PetsWebSocketActions.NewPet,
  (payload: IPet) => (dispatch, store, sendMessage) => {
    dispatch(fetchNewPets(payload));
    sendMessage({ action: PetsWebSocketActions.NewPetSuccess });
  }
);
