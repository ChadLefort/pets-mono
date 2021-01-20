import * as express from 'express';
import { petsFixture } from '@pets/types';

export const pets = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(petsFixture.filter((pet) => pet.type === 'Bird'));
  });

  return router;
};
