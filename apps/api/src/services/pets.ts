import * as faker from 'faker';
import * as ws from 'ws';
import { PetsWebSocketActions } from '@pet-tracker/types';

export class Pets {
  private petInterval?: NodeJS.Timeout;

  start(ws: ws) {
    this.petInterval = setInterval(() => {
      ws.send(
        JSON.stringify({
          action: PetsWebSocketActions.NewPet,
          payload: {
            id: faker.random.uuid(),
            name: faker.name.firstName(),
            age: faker.random.number(25),
            type: 'Bird'
          }
        })
      );
    }, 7000);
  }

  stop() {
    this.petInterval && clearInterval(this.petInterval);
  }
}
