import React from 'react';
import { memo, useEffect, useState, useCallback, useContext, Suspense, useMemo } from 'react';
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
  const pets = useSelector((state) => state.pets);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let petsList = pets;
    if (filter !== ''){
      const _filteredPets = pets.filter(
        ({ name, type, id }) =>
          id.toString().includes(filter) || name.includes(filter) || type.includes(filter)
      );
      petsList = _filteredPets.sort((pet1, pet2) => pet1.totalScore - pet2.totalScore);
    }
    const orderedPets = petsList.sort((pet1, pet2) => pet1.totalScore - pet2.totalScore);
    setFilteredPets(orderedPets);
  }, [filter, pets]);

  useEffect(() => {
    const orderedPets = pets.sort((pet1, pet2) => pet1.totalScore - pet2.totalScore);
    setFilteredPets(orderedPets);
  }, [pets]);

  const loadPets = useCallback((data) => dispatch({ type: 'loadPets', data }), [dispatch]);

  useEffect(() => {
    const ac = new AbortController();
    const getPets = async () => {
      const petsFromServer = await fetchPets(ac.signal);
      loadPets(petsFromServer);
    };

    getPets();

    return () => ac.abort();
  }, [loadPets]);

  const handleAdd = useCallback(() => dispatch({ type: 'increment' }), [dispatch]);

  const handleFilter = useCallback(
    (event) => {
        const search = event.target.value;
        setFilter(search);
    },
    []
  );

  return (
    <>
      <input typr="search" onChange={handleFilter} />
      <div className={cn('app-pets', { 'app-pets__grid': theme === 'grid' })}>
        {filteredPets.map((pet) => (
          <Card key={pet.id} pet={pet} onAdd={handleAdd} />
        ))}
      </div>
    </>
  );
});

export default PetsList;
