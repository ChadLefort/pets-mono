import React from 'react';
import { AddPets } from '../features/pets/components/AddPets';
import { EditPet } from '../features/pets/components/EditPet';
import { Route, Switch } from 'react-router-dom';
import { ViewPet } from '../features/pets/components/ViewPet';
import { ViewPets } from '../features/pets/components/ViewPets';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/edit/:id" component={EditPet} />
    <Route path="/add" component={AddPets} />
    <Route path="/:id" component={ViewPet} />
    <Route path="/" component={ViewPets} />
  </Switch>
);
