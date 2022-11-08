import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';
import StatusBar from '../../../shared/statusBar/statusBar';
import { requestInterval } from '../../../shared/utils';
import { getRandomInt } from '../../../api/generator';
import { ACTIONS } from '../../../constants/actions';
import { useDispatch } from 'react-redux';

import './card.css';

const initialStatus = 100;
const colorMap = {
  10: '#f2612c6f',
  20: '#f29c2c6f',
  50: '#eff16e6f',
  100: '#6ef1b46f'
};
const colorKeys = Object.keys(colorMap).map((val) => parseInt(val, 10));
const addedDiff = 10;

const Card = memo(({ pet, onAdd }) => {
  const [fun, setFun] = useState(initialStatus);
  const [feed, setFeed] = useState(initialStatus);
  const [sleep, setSleep] = useState(initialStatus);
  const [toilet, setToilet] = useState(initialStatus);
  const [attention, setAttention] = useState(initialStatus);

  const dispatch = useDispatch();
  const setTotalScore = useCallback(
    (totalScore) => dispatch({ type: 'setTotalScore', data: { id: pet.id, totalScore } }),
    [dispatch, pet.id]
  );

  //const [action, setAction] = useState();

  const settingsFun = useMemo(
    () => pet.statuses.find((status) => status.status === 'fun'),
    [pet.statuses]
  );
  const settingsFeed = useMemo(
    () => pet.statuses.find((status) => status.status === 'feed'),
    [pet.statuses]
  );
  const settingsSleep = useMemo(
    () => pet.statuses.find((status) => status.status === 'sleep'),
    [pet.statuses]
  );
  const settingsToilet = useMemo(
    () => pet.statuses.find((status) => status.status === 'toilet'),
    [pet.statuses]
  );
  const settingsAttention = useMemo(
    () => pet.statuses.find((status) => status.status === 'attention'),
    [pet.statuses]
  );

  const doAction = useCallback(
    (action) => {
      if (feed <= 90 && fun <= 90 && sleep <= 90 && toilet <= 90 && attention <= 90) {
        switch (action) {
          case 'feed':
            setFeed((value) => value + addedDiff);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setAttention((value) => value + settingsAttention.diff);
            setFun((value) => value - settingsFun.diff);
            break;
          case 'fun':
            setFun((value) => value + addedDiff);
            setFeed((value) => value - settingsFeed.diff);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setAttention((value) => value + settingsAttention.diff);
            break;
          case 'sleep':
            setSleep((value) => value + addedDiff);
            setFun((value) => value - settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            setToilet((value) => value - settingsToilet.diff);
            setAttention((value) => value - settingsAttention.diff);
            break;
          case 'toilet':
            setToilet((value) => value + addedDiff);
            setSleep((value) => value - settingsSleep.diff);
            setFun((value) => value - settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            setAttention((value) => value - settingsAttention.diff);
            break;
          case 'attention':
            setAttention((value) => value + addedDiff);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setFun((value) => value + settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            break;

          default:
            break;
        }
      }
    },
    [
      attention,
      feed,
      fun,
      settingsAttention.diff,
      settingsFeed.diff,
      settingsFun.diff,
      settingsSleep.diff,
      settingsToilet.diff,
      sleep,
      toilet
    ]
  );

  useEffect(() => {
    const { clear } = requestInterval(() => {
      const action = ACTIONS[getRandomInt(0, ACTIONS.length)];
      doAction(action);

      //setAction(action) // batching is working in useEffect
    }, 5000);
    if (feed <= 10 || fun <= 10 || sleep <= 10 || toilet <= 10 || attention <= 10) {
      clear();
    }
    return () => clear();
  }, [attention, doAction, feed, fun, sleep, toilet]);

  // batching is working in useEffect
  /*useEffect(() => {
    doAction(action);
  }, [action, attention, doAction, feed, fun, settingsAttention.diff, settingsFeed.diff, settingsFun.diff, settingsSleep.diff, settingsToilet.diff, sleep, toilet]);
*/

  useEffect(() => {
    let clearInterval;
    if (fun >= 0) {
      const { clear } = requestInterval(
        () => setFun((value) => value - settingsFun.diff),
        settingsFun.interval
      );
      clearInterval = clear;
    }
    return () => clearInterval && clearInterval();
  }, [fun, settingsFun.diff, settingsFun.interval]);

  useEffect(() => {
    let clearInterval;
    if (feed >= 0) {
      const { clear } = requestInterval(
        () => setFeed((value) => value - settingsFeed.diff),
        settingsFeed.interval
      );
      clearInterval = clear;
    }
    return () => clearInterval && clearInterval();
  }, [feed, settingsFeed.diff, settingsFeed.interval]);

  useEffect(() => {
    let clearInterval;
    if (sleep >= 0) {
      const { clear } = requestInterval(
        () => setSleep((value) => value - settingsSleep.diff),
        settingsSleep.interval
      );
      clearInterval = clear;
    }
    return () => clearInterval && clearInterval();
  }, [settingsSleep.diff, settingsSleep.interval, sleep]);

  useEffect(() => {
    let clearInterval;
    if (toilet >= 0) {
      const { clear } = requestInterval(
        () => setToilet((value) => value - settingsToilet.diff),
        settingsToilet.interval
      );
      clearInterval = clear;
    }
    return () => clearInterval && clearInterval();
  }, [settingsToilet.diff, settingsToilet.interval, toilet]);

  useEffect(() => {
    let clearInterval;
    if (attention >= 0) {
      const { clear } = requestInterval(
        () => setAttention((value) => value - settingsAttention.diff),
        settingsAttention.interval
      );
      clearInterval = clear;
    }
    return () => clearInterval && clearInterval();
  }, [attention, settingsAttention.diff, settingsAttention.interval]);

  const statusValues = useMemo(
    () => ({ fun, feed, sleep, toilet, attention }),
    [attention, feed, fun, sleep, toilet]
  );

  const totalScore = useMemo(
    () => (100 * (fun + feed + sleep + attention + toilet)) / (initialStatus * 5),
    [attention, feed, fun, sleep, toilet]
  );

  useEffect(() => {
    setTotalScore(totalScore);
  }, [setTotalScore, totalScore]);

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
    // for batching feature
    setTimeout(() => {
      onAdd();
      setFun(initialStatus);
      setFeed(initialStatus);
      setAttention(initialStatus);
      setSleep(initialStatus);
      setToilet(initialStatus);
    }, 0);
  }, [onAdd]);

  //console.log(`${React.version} card.component.js update`);

  return (
    <div className="app-card" style={style}>
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
      <button className="app-card__btn" onClick={handleAdd}>
        Make happy
      </button>
    </div>
  );
});

export default Card;
