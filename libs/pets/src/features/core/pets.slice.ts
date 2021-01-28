import axios from 'axios';
import { condition, error, isFetching, State as CommonState } from '@pets/utils';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPet, PetsWebSocketActions, PetType } from '@pets/types';
import { RootState } from '../../common/reducer';

const name = 'lib/pets/core';

export const fetchPets = createAsyncThunk(
  `${name}/fetchPets`,
  async (type: PetType) => {
    const { data } = await axios.get<IPet[]>('/api/pets', {
      params: { type }
    });

    return data;
  },
  { condition: condition('pets') }
);

export const addPet = createAsyncThunk(`${name}/addPet`, async (pet: IPet) => {
  const { data } = await axios.post<IPet>('/api/pets', pet);
  return data;
});

export const updatePet = createAsyncThunk(`${name}/updatePet`, async (pet: IPet) => {
  const { data } = await axios.put<IPet>(`/api/pets/${pet.id}`, pet);
  return data;
});

export const removePet = createAsyncThunk(`${name}/removePets`, async (id: string) => {
  await axios.delete(`/api/pets/${id}`);
  return id;
});

export const petsAdapter = createEntityAdapter<IPet>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const petsSelectors = petsAdapter.getSelectors<RootState>((state) => state.pets.core);

type State = { hasStarted: boolean } & CommonState;

export const initialState = petsAdapter.getInitialState<State>({
  hasStarted: false,
  isFetching: false,
  error: null
});

const pets = createSlice({
  name,
  initialState,
  reducers: {
    start: {
      reducer: (state) => {
        state.hasStarted = true;
      },
      prepare: () => ({
        payload: {},
        meta: {
          ws: {
            action: PetsWebSocketActions.Start
          }
        }
      })
    },
    stop: {
      reducer: (state) => {
        state.hasStarted = false;
      },
      prepare: () => ({
        payload: {},
        meta: {
          ws: {
            action: PetsWebSocketActions.Stop
          }
        }
      })
    },
    fetchNewPets(state, action) {
      petsAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, isFetching)
      .addCase(addPet.pending, isFetching)
      .addCase(updatePet.pending, isFetching)
      .addCase(removePet.pending, isFetching)
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isFetching = false;
        petsAdapter.setAll(state, action.payload);
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isFetching = false;
        petsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePet.fulfilled, (state, action) => {
        state.isFetching = false;
        petsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload
        });
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.isFetching = false;
        petsAdapter.removeOne(state, action.payload);
      })
      .addCase(fetchPets.rejected, error)
      .addCase(addPet.rejected, error)
      .addCase(updatePet.rejected, error)
      .addCase(removePet.rejected, error);
  }
});

export const {
  actions: { start, stop, fetchNewPets },
  reducer: petsReducer
} = pets;
