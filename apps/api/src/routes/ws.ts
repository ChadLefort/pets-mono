import * as express from 'express';
import { Pets } from '../services/pets';
import { PetsWebSocketActions } from '@pets/types';

export const ws = () => {
  const router = express.Router();

  router.ws('/pets', (ws) => {
    const pets = new Pets();

    ws.on('message', (req) => {
      const { action } = JSON.parse(req as string);

      console.log(req);

      switch (action) {
        case PetsWebSocketActions.Start:
          pets.start(ws);
          break;
        case PetsWebSocketActions.Stop:
          pets.stop();
          break;
      }
    });

    ws.on('close', () => {
      pets.stop();
      console.log('client disconnected');
    });
  });

  return router;
};
