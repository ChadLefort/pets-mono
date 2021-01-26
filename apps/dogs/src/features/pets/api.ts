import axios from 'axios';
import { IPet } from '@pets/types';

export const getPets = async () => {
  const { data } = await axios.get<IPet[]>('/api/pets', {
    params: { type: 'Dog' }
  });

  return data;
};

export const getPet = async (key: string, id: number) => {
  const { data } = await axios.get<IPet>(`/api/pets/${id}`);
  return data;
};

export const postPet = async (pet: IPet) => {
  const { data } = await axios.post<IPet>('/api/pets', pet);
  return data;
};

export const putPet = async (pet: IPet) => {
  const { data } = await axios.put<IPet>(`/api/pets/${pet.id}`, pet);
  return data;
};

export const deletePet = async (id: string) => {
  await axios.delete(`/api/pets/${id}`);
  return id;
};
