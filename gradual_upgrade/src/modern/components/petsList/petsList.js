import React from 'react';
import {
  memo,
  useEffect,
  useState,
  useCallback,
  useContext,
  useDeferredValue,
  useTransition,
  useMemo
} from 'react';
import { fetchPets } from '../../../api/api';
import Card from '../../shared/card/card';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import CardWithReducer from '../../shared/card/cardWithReducer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
  const deferredPets = useDeferredValue(pets);

  const loading = useSelector((state) => state.pets.loading);
  const [filteredPets, setFilteredPets] = useState([]);
  const [orderedPets, setOrderedPets] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  //const deferredSearchValue = useDeferredValue(searchValue);

  const isEmptySearch = useMemo(() => searchValue === '', [searchValue]);

  const loadPets = useCallback((data) => dispatch(createLoadPetsAction(data)), [dispatch]);
  const startLoading = useCallback(() => dispatch(createLoadingStartPetsAction()), [dispatch]);
  const finishLoading = useCallback(() => dispatch(createLoadingFinishPetsAction()), [dispatch]);
  const handleAdd = useCallback(() => dispatch(createIncrementAction()), [dispatch]);

  useEffect(() => {
    if (isEmptySearch) {
      setFilteredPets(deferredPets);
    }
  }, [deferredPets, isEmptySearch]);

  useEffect(() => {
    const _filteredPets = [...filteredPets];
    orderPets(_filteredPets);
    setOrderedPets(_filteredPets);
  }, [filteredPets]);

  const [isPending, startTransition] = useTransition();

  const filterPets = useCallback(
    (search) => {
        const foundPets = searchPets(deferredPets, search);
        setFilteredPets(foundPets)  
    },
    [deferredPets]
  );

  useEffect(() => {
    if (!isEmptySearch) {
      startTransition(() => filterPets(searchValue));
    }
  }, [searchValue, filterPets, isEmptySearch]);

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
        {(loading || isPending) && <Spinner />}
        {orderedPets.map((pet) => (
          <Card key={pet.id} pet={pet} onAdd={handleAdd} />
          /*<CardWithReducer key={pet.id} pet={pet} onAdd={handleAdd} />*/
          /*<CardWithEffect key={pet.id} pet={pet} onAdd={handleAdd} />*/
        ))}
      </div>
    </>
  );
});

export default PetsList;
