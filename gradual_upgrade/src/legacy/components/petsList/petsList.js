import React from 'react';
import { memo, useEffect, useState, useCallback, useContext } from 'react';
import { fetchPets } from '../../../api/api';
import Card from '../../shared/card/card';
import { useDispatch } from 'react-redux';
import * as cn from 'classnames';
import ThemeContext from '../../shared/ThemeContext';

import './petsList.css';

const PetsList = memo(() => {
  const { theme } = useContext(ThemeContext);
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const ac = new AbortController();
    const getPets = async () => {
      const petsFromServer = await fetchPets(ac.signal);
      setPets(petsFromServer);
    };

    getPets();

    return () => ac.abort();
  }, []);

  const handleAdd = useCallback(() => dispatch({ type: 'increment' }), [dispatch]);

  return (
    <div className={cn('app-pets', { 'app-pets__grid': theme === 'grid' })}>
      {pets.map((pet) => (
        <Card key={pet.id} pet={pet} onAdd={handleAdd} />
      ))}
    </div>
  );
});

export default PetsList;
