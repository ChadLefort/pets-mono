import * as faker from 'faker';
import * as ws from 'ws';
import { PetsWebSocketActions } from '@pets/types';

export class Pets {
  private petInterval: NodeJS.Timeout;
  private titleInterval: NodeJS.Timeout;

  start(ws: ws) {
    this.petInterval = setInterval(() => {
      ws.send(
        JSON.stringify({
          action: PetsWebSocketActions.NewPet,
          payload: {
            id: faker.random.uuid(),
            name: faker.name.firstName(),
            age: faker.random.number(25),
            type: 'Bird',
          },
        })
      );
    }, 7000);

    this.titleInterval = setInterval(() => {
      ws.send(
        JSON.stringify({
          action: PetsWebSocketActions.NewTitle,
          payload: faker.random.word(),
        })
      );
    }, 10000);
  }

  stop() {
    clearInterval(this.petInterval);
    clearInterval(this.titleInterval);
  }
}
