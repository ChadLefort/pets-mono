import * as express from 'express';
import * as expressWs from 'express-ws';
import { auth } from './app/auth';
import { pets } from './app/pets';
import { websocketGateway } from './app/ws-gateway';

class App {
  express: expressWs.Application;

  constructor() {
    const app = express();
    const ws = expressWs(app);
    const port = process.env.port || 3333;

    this.express = ws.app;
    this.express.ws('/api/ws/pets', websocketGateway);
    this.express.use('/api/auth', auth);
    this.express.use('/api/pets', pets);

    const server = app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });

    server.on('error', console.error);
  }
}

export const app = new App();
