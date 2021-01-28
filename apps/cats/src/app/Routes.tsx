import React from 'react';
import { AddPets, EditPet, ViewPet, ViewPets } from '@pet-tracker/pets';
import { PetType } from '@pet-tracker/types';
import { Route, Switch } from 'react-router-dom';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />
    <Route path="/add" render={() => <AddPets type={PetType.Cat} />} />
    <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />
    <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />
  </Switch>
);
