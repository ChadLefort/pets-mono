import * as express from 'express';
import * as expressWs from 'express-ws';
import { auth } from './routes/auth';
import { pets } from './routes/pets';
import { ws } from './routes/ws';

const port = process.env.port || 4000;
const app = express();

expressWs(app);

app.use('/api/ws', ws());
app.use('/api/auth', auth());
app.use('/api/pets', pets());

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

server.on('error', console.error);
