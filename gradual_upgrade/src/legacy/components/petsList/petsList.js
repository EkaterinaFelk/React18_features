import React from 'react';
import { memo, useEffect, useMemo, useState, useCallback, useContext } from 'react';
import { fetchPets } from '../../../api/api';
import Card from '../../shared/card/card';
import CardWithReducer from '../../shared/card/cardWithReducer';
import CardWithEffect from '../../shared/card/cardWithEffect';
import { useDispatch, useSelector } from 'react-redux';
import ThemeContext from '../../shared/ThemeContext';
import * as cn from 'classnames';
import Spinner from '../../shared/loading/loading';
import { orderPets, searchPets } from '../../../utils';
import {
  createLoadPetsAction,
  createIncrementAction,
  createLoadingFinishPetsAction,
  createLoadingStartPetsAction
} from '../../../store';

import './petsList.css';

const PetsList = memo(() => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets.data);
  const loading = useSelector((state) => state.pets.loading);

  const [filteredPets, setFilteredPets] = useState([]);
  const [orderedPets, setOrderedPets] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const isEmptySearch = useMemo(() => searchValue === '', [searchValue]);

  const loadPets = useCallback((data) => dispatch(createLoadPetsAction(data)), [dispatch]);
  const startLoading = useCallback(() => dispatch(createLoadingStartPetsAction()), [dispatch]);
  const finishLoading = useCallback(() => dispatch(createLoadingFinishPetsAction()), [dispatch]);
  const handleAdd = useCallback(() => dispatch(createIncrementAction()), [dispatch]);

  useEffect(() => {
    if (isEmptySearch) {
      setFilteredPets(pets);
    }
  }, [pets, isEmptySearch]);

  useEffect(() => {
    const _filteredPets = [...filteredPets];
    orderPets(_filteredPets);
    setOrderedPets(_filteredPets);
  }, [filteredPets]);

  const filterPets = useCallback(
    (search) => {
      if (search !== '') {
        const foundPets = searchPets(pets, search);
        setFilteredPets(foundPets);
      }
    },
    [pets]
  );

  useEffect(() => {
    filterPets(searchValue);
  }, [searchValue, filterPets]);

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

  const handleFilter = useCallback((event) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  return (
    <>
     <input typr="search" className={'app-pets__search'} placeholder={'Search'} value={searchValue} onChange={handleFilter} />
      <div className={cn('app-pets', { 'app-pets__grid': theme === 'grid' })}>
        {loading && <Spinner />}
        {orderedPets.map((pet) => (
          /*<Card key={pet.id} pet={pet} onAdd={handleAdd} />*/
          <CardWithReducer key={pet.id} pet={pet} onAdd={handleAdd} />
          /*<CardWithEffect key={pet.id} pet={pet} onAdd={handleAdd} />*/
        ))}
      </div>
    </>
  );
});

export default PetsList;
