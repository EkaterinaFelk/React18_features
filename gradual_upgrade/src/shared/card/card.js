import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import StatusBar from '../statusBar/statusBar';
import './card.css';

const initialStatus = 100;
const colorMap = {
  10: '#f2612c6f',
  20: '#f29c2c6f',
  50: '#eff16e6f',
  100: '#6ef1b46f'
};
const colorKeys = Object.keys(colorMap).map((val) => parseInt(val, 10));

const Card = memo(({ pet, onAdd }) => {
  const [fun, setFun] = useState(initialStatus);
  const [feed, setFeed] = useState(initialStatus);
  const [sleep, setSleep] = useState(initialStatus);
  const [toilet, setToilet] = useState(initialStatus);
  const [attention, setAttention] = useState(initialStatus);

  useEffect(() => {
    let intervalId;
    const settings = pet.statuses.find((status) => status.status === 'fun');
    if (fun >= 0) {
      intervalId = setInterval(() => setFun((value) => value - settings.diff), settings.interval);
    }
    return () => clearInterval(intervalId);
  }, [fun, pet.statuses]);

  useEffect(() => {
    let intervalId;
    const settings = pet.statuses.find((status) => status.status === 'feed');
    if (feed >= 0) {
      intervalId = setInterval(() => setFeed((value) => value - settings.diff), settings.interval);
    }
    return () => clearInterval(intervalId);
  }, [feed, pet.statuses]);

  useEffect(() => {
    let intervalId;
    const settings = pet.statuses.find((status) => status.status === 'sleep');
    if (sleep >= 0) {
      intervalId = setInterval(() => setSleep((value) => value - settings.diff), settings.interval);
    }
    return () => clearInterval(intervalId);
  }, [pet.statuses, sleep]);

  useEffect(() => {
    let intervalId;
    const settings = pet.statuses.find((status) => status.status === 'toilet');
    if (toilet >= 0) {
      intervalId = setInterval(
        () => setToilet((value) => value - settings.diff),
        settings.interval
      );
    }
    return () => clearInterval(intervalId);
  }, [pet.statuses, toilet]);

  useEffect(() => {
    let intervalId;
    const settings = pet.statuses.find((status) => status.status === 'attention');
    if (attention >= 0) {
      intervalId = setInterval(
        () => setAttention((value) => value - settings.diff),
        settings.interval
      );
    }
    return () => clearInterval(intervalId);
  }, [pet.statuses, attention]);

  const statusValues = useMemo(
    () => ({ fun, feed, sleep, toilet, attention }),
    [attention, feed, fun, sleep, toilet]
  );

  const totalScore = useMemo(
    () => (100 * (fun + feed + sleep + attention + toilet)) / (initialStatus * 5),
    [attention, feed, fun, sleep, toilet]
  );

  const scoreColor = useMemo(() => {
    if (totalScore <= 100 && totalScore >= colorKeys[3]) {
      return colorMap[colorKeys[3]];
    } else if (totalScore <= colorKeys[3] && totalScore >= colorKeys[2]) {
      return colorMap[colorKeys[3]];
    } else if (totalScore <= colorKeys[2] && totalScore >= colorKeys[1]) {
      return colorMap[colorKeys[2]];
    } else if (totalScore <= colorKeys[1] && totalScore >= colorKeys[0]) {
      return colorMap[colorKeys[1]];
    } else if (totalScore <= colorKeys[0] && totalScore >= 0) {
      return colorMap[colorKeys[0]];
    } else {
        return colorMap[colorKeys[0]];
    }
  }, [totalScore]);

  const style = useMemo(
    () => ({
      '--color': scoreColor
    }),
    [scoreColor]
  );

  const handleAdd = useCallback(() => {
    onAdd();
    setFun(initialStatus);
    setFeed(initialStatus);
    setAttention(initialStatus);
    setSleep(initialStatus);
    setToilet(initialStatus);
  }, [onAdd]);

  return (
    <div className="app-card" style={style}>
      {React.version}
      <div>
        <span className="app-card__type">{pet.type}</span>{' '}
        <span className="app-card__name" style={{ color: pet.color }}>
          {pet.name}
        </span>
      </div>
      <p className="app-card__age">{pet.age} years old</p>
      {pet.statuses.map((status) => (
        <StatusBar key={status.status} title={status.status} value={statusValues[status.status]} />
      ))}
      <button className="app-card__btn" onClick={handleAdd}>Make happy</button>
    </div>
  );
});

export default Card;
