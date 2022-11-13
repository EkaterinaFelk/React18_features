import React, { useState } from 'react';
import { useCallback } from 'react';
import { addPets } from '../../../api/api';
import generateData from '../../../api/generator';

import './generator.css';

export default function Generator() {
  const [count, setCount] = useState(100);

  const addGeneratedPets = useCallback(async (data) => {
    await addPets(data);
  }, []);

  const handleGenerateData = useCallback(() => {
    const data = generateData(count);
    addGeneratedPets(data);
  }, [addGeneratedPets, count]);

  const handleOnChange= useCallback((event) => setCount(event.target.value), []);

  return (
    <div className="app-generator">
      <button className="app-generator__btn" onClick={handleGenerateData}>Generate</button>
      <input className="app-generator__input" value={count} onChange={handleOnChange} />
    </div>
  );
}
