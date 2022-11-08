import React from 'react';
import {
  memo,
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useDeferredValue,
  useTransition
} from 'react';
import { fetchPets } from '../../../api/api';
import Card from '../../shared/card/card';
import { useDispatch, useSelector } from 'react-redux';
import ThemeContext from '../../shared/ThemeContext';
import * as cn from 'classnames';
import Spinner from '../../shared/loading/loading';

import './petsList.css';

const PetsList = memo(() => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const pets = useSelector((state) => state.pets.data);
  const deferredPets = useDeferredValue(pets);

  const loading = useSelector((state) => state.pets.loading);
  const [filteredPets, setFilteredPets] = useState([]);
  const [orderedPets, setOrderedPets] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const deferredSearchValue = useDeferredValue(searchValue);

  const [isPending, startTransition] = useTransition();

  const loadPets = useCallback((data) => dispatch({ type: 'loadPets', data }), [dispatch]);
  const startLoading = useCallback(() => dispatch({ type: 'loadingStart' }), [dispatch]);
  const finishLoading = useCallback(() => dispatch({ type: 'loadingFinish' }), [dispatch]);

  useEffect(() => {
    if (deferredSearchValue === '') {
      setFilteredPets(orderedPets);
    }
  }, [deferredSearchValue, orderedPets]);

  useEffect(() => {
    const orderedPets = deferredPets.sort((pet1, pet2) => pet1.totalScore - pet2.totalScore);
    setOrderedPets(orderedPets);
  }, [deferredPets]);

  const filterPets = useCallback(
    (search) => {
      if (search !== '') {
        const _filteredPets = deferredPets.filter(
          ({ name, type, id }) =>
            id.toString().includes(search) || name.includes(search) || type.includes(search)
        );
        console.log('filter', search);
        setFilteredPets(_filteredPets);
      }
    },
    [deferredPets]
  );

  useEffect(() => {
    filterPets(deferredSearchValue);
  }, [deferredSearchValue, filterPets]);

  useEffect(() => {
    startLoading();
    const ac = new AbortController();
    const getPets = async () => {
      const petsFromServer = await fetchPets(ac.signal);
      loadPets(petsFromServer);
      finishLoading();
    };

    getPets();

    return () => ac.abort();
  }, [finishLoading, loadPets, startLoading]);

  const handleAdd = useCallback(() => dispatch({ type: 'increment' }), [dispatch]);

  const handleFilter = useCallback((event) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  return (
    <>
      <input typr="search" value={searchValue} onChange={handleFilter} />
      <div className={cn('app-pets', { 'app-pets__grid': theme === 'grid' })}>
        {(loading || isPending) && <Spinner />}
        {filteredPets.map((pet) => (
          <Card key={pet.id} pet={pet} onAdd={handleAdd} />
        ))}
      </div>
    </>
  );
});

export default PetsList;
