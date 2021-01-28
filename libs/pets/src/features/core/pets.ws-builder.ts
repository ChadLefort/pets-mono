import { fetchNewPets } from './pets.slice';
import { IPet, PetsWebSocketActions } from '@pets/types';
import { websocketBuilder } from '@pets/utils';

export const petsWebsocketBuilder = websocketBuilder().add(
  PetsWebSocketActions.NewPet,
  (payload: IPet) => (dispatch, store, sendMessage) => {
    dispatch(fetchNewPets(payload));
    sendMessage({ action: PetsWebSocketActions.NewPetSuccess });
  }
);
