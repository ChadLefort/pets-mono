import { IPet } from '@pets/types';
import { websocketBuilder } from '@pets/core';
import {
  fetchNewPets,
  fetchNewTitle,
  WebSocketAction,
} from 'features/pets/slice';

export const connection = new WebSocket('ws://localhost:4200/api/ws/pets');

export const callbacks = websocketBuilder()
  .add(
    WebSocketAction.NewPet,
    (payload: IPet) => (dispatch, store, sendMessage) => {
      dispatch(fetchNewPets(payload));
      sendMessage({ action: WebSocketAction.NewPetSuccess });
    }
  )
  .add(
    WebSocketAction.NewTitle,
    (payload: string) => (dispatch, store, sendMessage) => {
      dispatch(fetchNewTitle(payload));
    }
  );
