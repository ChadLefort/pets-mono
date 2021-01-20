import * as ws from 'ws';
import { Pets } from './ws-pets';

export const websocketGateway = (ws: ws) => {
  const pets = new Pets();

  ws.on('message', (req: string) => {
    const { action, payload } = JSON.parse(req);

    console.log(req);

    switch (action) {
      case 'start':
        pets.start(ws);
        break;
      case 'stop':
        pets.stop(ws);
        break;
    }
  });

  ws.on('close', () => {
    pets.stop(ws);
    console.log('client disconnected');
  });
};
