import * as faker from 'faker';
import * as ws from 'ws';

export class Pets {
  private petInterval: NodeJS.Timeout;
  private titleInterval: NodeJS.Timeout;

  start(ws: ws) {
    this.petInterval = setInterval(() => {
      ws.send(
        JSON.stringify({
          action: 'newPet',
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
          action: 'newTitle',
          payload: faker.random.word(),
        })
      );
    }, 10000);
  }

  stop(ws: ws) {
    clearInterval(this.petInterval);
    clearInterval(this.titleInterval);
  }
}
