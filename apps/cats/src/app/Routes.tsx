import React from 'react';
import { AddPets, EditPet, ViewPet, ViewPets } from '@pets/pets';
import { PetType } from '@pets/types';
import { Route, Switch } from 'react-router-dom';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/edit/:id" render={() => <EditPet type={PetType.Cat} />} />
    <Route path="/add" component={AddPets} />
    <Route path="/:id" render={() => <ViewPet type={PetType.Cat} />} />
    <Route path="/" render={() => <ViewPets type={PetType.Cat} />} />
  </Switch>
);
