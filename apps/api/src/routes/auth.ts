import * as express from 'express';
import { authFixture } from '@pet-tracker/types';

export const auth = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(authFixture);
  });

  return router;
};
