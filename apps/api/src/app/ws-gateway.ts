import * as ws from 'ws';
import { Pets } from './ws-pets';
import { PetsWebSocketActions } from '@pets/types';

export const websocketGateway = (ws: ws) => {
  const pets = new Pets();

  ws.on('message', (req: string) => {
    const { action, payload } = JSON.parse(req);

    console.log(req);

    switch (action) {
      case PetsWebSocketActions.Start:
        pets.start(ws);
        break;
      case PetsWebSocketActions.Stop:
        pets.stop(ws);
        break;
    }
  });

  ws.on('close', () => {
    pets.stop(ws);
    console.log('client disconnected');
  });
};
