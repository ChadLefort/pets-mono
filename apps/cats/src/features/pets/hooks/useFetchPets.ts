import { fetchPets, petsSelectors } from '../slice';
import { store } from 'app/store';
import { useAppDispatch, useTypedSelector } from 'app/reducer';
import { useEffect } from 'react';

export function useFetchPets() {
  const dispatch = useAppDispatch();
  const { isFetching, error } = useTypedSelector((state) => state.pets);
  const pets = petsSelectors.selectAll(store.getState());

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return { pets, isFetching, error };
}
