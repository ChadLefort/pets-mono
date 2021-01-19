import axios, { AxiosError } from 'axios';
import { error, isFetching, State } from '@pets/core';
import { IPet } from './interfaces';
import { RootState } from 'app/store';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

const name = 'spa/birds/pets';

export const fetchPets = createAsyncThunk<
  IPet[],
  void,
  {
    rejectValue: string;
  }
>(`${name}/fetchPets`, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IPet[]>('/api/pets', {
      params: { type: 'Bird' },
    });

    return data;
  } catch (err) {
    const error: AxiosError = err;

    if (error.response?.status === 404) {
      return rejectWithValue('pets not found');
    } else {
      throw error;
    }
  }
});

export const addPet = createAsyncThunk(`${name}/addPet`, async (pet: IPet) => {
  const { data } = await axios.post<IPet>('/api/pets', pet);
  return data;
});

export const updatePet = createAsyncThunk(
  `${name}/updatePet`,
  async (pet: IPet) => {
    const { data } = await axios.put<IPet>(`/api/pets/${pet.id}`, pet);
    return data;
  }
);

export const removePet = createAsyncThunk(
  `${name}/removePets`,
  async (id: number) => {
    await axios.delete(`/api/pets/${id}`);
    return id;
  }
);

export const petsAdapter = createEntityAdapter<IPet>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const petsSelectors = petsAdapter.getSelectors<RootState>(
  (state) => state.pets
);

export const initialState = petsAdapter.getInitialState<State>({
  hasFetched: false,
  isFetching: false,
  error: null,
});

const pets = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, isFetching)
      .addCase(addPet.pending, isFetching)
      .addCase(updatePet.pending, isFetching)
      .addCase(removePet.pending, isFetching)
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.hasFetched = true;
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
          changes: action.payload,
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
  },
});

export const { reducer: petsReducer } = pets;
