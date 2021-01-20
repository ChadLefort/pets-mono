import axios, { AxiosError } from 'axios';
import { error, isFetching, State as CommonState } from '@pets/core';
import { IPet } from '@pets/types';
import { RootState } from 'app/store';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export enum WebSocketAction {
  Start = 'start',
  Stop = 'stop',
  NewPet = 'newPet',
  NewPetSuccess = 'newPetSuccess',
  NewTitle = 'newTitle',
}

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
  async (id: string) => {
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

type State = { hasStarted: boolean; title: string | null } & CommonState;

export const initialState = petsAdapter.getInitialState<State>({
  hasFetched: false,
  hasStarted: false,
  isFetching: false,
  title: null,
  error: null,
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
            action: WebSocketAction.Start,
          },
        },
      }),
    },
    stop: {
      reducer: (state) => {
        state.hasStarted = false;
      },
      prepare: () => ({
        payload: {},
        meta: {
          ws: {
            action: WebSocketAction.Stop,
          },
        },
      }),
    },
    fetchNewPets(state, action) {
      petsAdapter.addOne(state, action.payload);
    },
    fetchNewTitle(state, action) {
      state.title = action.payload;
    },
  },
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

export const {
  actions: { start, stop, fetchNewPets, fetchNewTitle },
  reducer: petsReducer,
} = pets;
