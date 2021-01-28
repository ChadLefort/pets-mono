import * as express from 'express';
import { petsFixture, PetType } from '@pets/types';

export const pets = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(petsFixture.filter((pet) => pet.type === PetType.Dog));
  });

  return router;
};
