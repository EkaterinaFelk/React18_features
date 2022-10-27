import React, { memo } from 'react';
import './card.css';

const Card = memo(({ pet, onAdd }) => {
  return (
    <div className="app-card">
      <div>
        <span className="app-card__type">{pet.type}</span>{' '}
        <span className="app-card__name" style={{ color: pet.color }}>
          {pet.name}
        </span>
      </div>
      <p className="app-card__age">{pet.age} years old</p>
      <p className="app-card__description">{pet.description}</p>

      <p className="app-card__hadOwner">{pet.hadOwner}</p>
      <button onClick={onAdd}>Add me</button>
    </div>
  );
});

export default Card;
