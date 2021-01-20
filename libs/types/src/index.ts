import { IPet } from './interfaces/pet';

export * from './interfaces/pet';
export * from './types/ws-pets';

export const authFixture = require('./fixtures/auth.json') as {
  ssoToken: string;
};

export const petsFixture = require('./fixtures/pets.json') as IPet[];
