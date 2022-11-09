import React, { memo, useState, useEffect, useMemo, useCallback, useReducer } from 'react';
import StatusBar from '../../../shared/statusBar/statusBar';
import {
  requestInterval,
  createPropertyInterval,
  getPetSettings,
  isReadyToAction,
  isReadyToCancelAction
} from '../../../utils';
import { getRandomInt } from '../../../api/generator';
import { useDispatch } from 'react-redux';
import {
  ACTIONS,
  ADDED_DIFF,
  COLOR_KEYS,
  INITIAL_STATUS,
  COLOR_MAP
} from '../../../constants/petProperties';

import './card.css';

const Card = memo(({ pet, onAdd }) => {
  //todo: check performance with useReducer
  //#region useReducer
  /* const [state, dispatchState] = useReducer(reducer, {
    fun: INITIAL_STATUS,
    feed: INITIAL_STATUS,
    sleep: INITIAL_STATUS,
    toilet: INITIAL_STATUS,
    attention: INITIAL_STATUS
  });

  function reducer(state, action) {
    switch (action.type) {
      case 'feed': {
        return {
          ...state,
          feed: state.feed + ADDED_DIFF,
          toilet: state.toilet - settingsToilet.diff,
          sleep: state.sleep - settingsSleep.diff,
          attention: state.attention + settingsAttention.diff,
          fun: state.fun - settingsFun.diff
        };
      }
      case 'fun': {
        return {
          ...state,
          fun: state.fun + ADDED_DIFF,
          feed: state.feed - settingsFeed.diff,
          toilet: state.toilet - settingsToilet.diff,
          sleep: state.sleep - settingsSleep.diff,
          attention: state.attention + settingsAttention.diff
        };
      }
      case 'sleep': {
        return {
          ...state,
          sleep: state.sleep + ADDED_DIFF,
          fun: state.fun - settingsFun.diff,
          feed: state.feed - settingsFeed.diff,
          toilet: state.toilet - settingsToilet.diff,
          attention: state.attention + settingsAttention.diff
        };
      }
      case 'toilet': {
        return {
          ...state,
          toilet: state.toilet + ADDED_DIFF,
          sleep: state.sleep - settingsSleep.diff,
          fun: state.fun - settingsFun.diff,
          feed: state.feed - settingsFeed.diff,
          attention: state.attention - settingsAttention.diff
        };
      }
      case 'attention': {
        return {
          ...state,
          attention: state.attention + ADDED_DIFF,
          toilet: state.toilet - settingsToilet.diff,
          sleep: state.sleep - settingsSleep.diff,
          fun: state.fun + settingsFun.diff,
          feed: state.feed - settingsFeed.diff,
        };
      }
      default:
        return state;
    }
  } */
  //#endregion useReducer

  //#region useState
  const [fun, setFun] = useState(INITIAL_STATUS);
  const [feed, setFeed] = useState(INITIAL_STATUS);
  const [sleep, setSleep] = useState(INITIAL_STATUS);
  const [toilet, setToilet] = useState(INITIAL_STATUS);
  const [attention, setAttention] = useState(INITIAL_STATUS);
  //#endregion useState

  const dispatch = useDispatch();
  const setTotalScore = useCallback(
    (totalScore) => dispatch({ type: 'setTotalScore', data: { id: pet.id, totalScore } }),
    [dispatch, pet.id]
  );

  //const [action, setAction] = useState();

  const settingsFun = useMemo(() => getPetSettings(pet.statuses, 'fun'), [pet.statuses]);
  const settingsFeed = useMemo(() => getPetSettings(pet.statuses, 'feed'), [pet.statuses]);
  const settingsSleep = useMemo(() => getPetSettings(pet.statuses, 'sleep'), [pet.statuses]);
  const settingsToilet = useMemo(() => getPetSettings(pet.statuses, 'toilet'), [pet.statuses]);
  const settingsAttention = useMemo(
    () => getPetSettings(pet.statuses, 'attention'),
    [pet.statuses]
  );

  const doAction = useCallback(
    (action) => {
      if (isReadyToAction(feed, fun, sleep, toilet, attention)) {
        switch (action) {
          case 'feed':
            //#region useState
            setFeed((value) => value + ADDED_DIFF);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setAttention((value) => value + settingsAttention.diff);
            setFun((value) => value - settingsFun.diff);
            //#endregion useState

            //dispatchState({ type: 'feed' });
            break;
          case 'fun':
            //#region useState
            setFun((value) => value + ADDED_DIFF);
            setFeed((value) => value - settingsFeed.diff);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setAttention((value) => value + settingsAttention.diff);
            //#endregion useState

            //dispatchState({ type: 'fun' });
            break;
          case 'sleep':
            //#region useState
            setSleep((value) => value + ADDED_DIFF);
            setFun((value) => value - settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            setToilet((value) => value - settingsToilet.diff);
            setAttention((value) => value - settingsAttention.diff);
            //#endregion useState

            //dispatchState({ type: 'sleep' });
            break;
          case 'toilet':
            //#region useState
            setToilet((value) => value + ADDED_DIFF);
            setSleep((value) => value - settingsSleep.diff);
            setFun((value) => value - settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            setAttention((value) => value - settingsAttention.diff);
            //#endregion useState

            //dispatchState({ type: 'toilet' });
            break;
          case 'attention':
            //#region useState
            setAttention((value) => value + ADDED_DIFF);
            setToilet((value) => value - settingsToilet.diff);
            setSleep((value) => value - settingsSleep.diff);
            setFun((value) => value + settingsFun.diff);
            setFeed((value) => value - settingsFeed.diff);
            //#endregion useState

            //dispatchState({ type: 'attention' });
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
    if (isReadyToCancelAction(feed, fun, sleep, toilet, attention)) {
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
    const clear = createPropertyInterval(
      fun,
      () => setFun((value) => value - settingsFun.diff),
      settingsFun.interval
    );
    return () => clear();
  }, [fun, settingsFun.diff, settingsFun.interval]);

  useEffect(() => {
    const clear = createPropertyInterval(
      feed,
      () => setFeed((value) => value - settingsFeed.diff),
      settingsFeed.interval
    );
    return () => clear();
  }, [feed, settingsFeed.diff, settingsFeed.interval]);

  useEffect(() => {
    const clear = createPropertyInterval(
      sleep,
      () => setSleep((value) => value - settingsSleep.diff),
      settingsSleep.interval
    );
    return () => clear();
  }, [settingsSleep.diff, settingsSleep.interval, sleep]);

  useEffect(() => {
    const clear = createPropertyInterval(
      toilet,
      () => setToilet((value) => value - settingsToilet.diff),
      settingsToilet.interval
    );
    return () => clear();
  }, [settingsToilet.diff, settingsToilet.interval, toilet]);

  useEffect(() => {
    const clear = createPropertyInterval(
      attention,
      () => setAttention((value) => value - settingsAttention.diff),
      settingsAttention.interval
    );
    return () => clear();
  }, [attention, settingsAttention.diff, settingsAttention.interval]);

  const statusValues = useMemo(
    () => ({ fun, feed, sleep, toilet, attention }),
    [attention, feed, fun, sleep, toilet]
  );

  const totalScore = useMemo(
    () => (100 * (fun + feed + sleep + attention + toilet)) / (INITIAL_STATUS * 5),
    [attention, feed, fun, sleep, toilet]
  );

  useEffect(() => {
    setTotalScore(totalScore);
  }, [setTotalScore, totalScore]);

  const scoreColor = useMemo(() => {
    if (totalScore <= INITIAL_STATUS && totalScore >= COLOR_KEYS[3]) {
      return COLOR_MAP[COLOR_KEYS[3]];
    } else if (totalScore <= COLOR_KEYS[3] && totalScore >= COLOR_KEYS[2]) {
      return COLOR_MAP[COLOR_KEYS[3]];
    } else if (totalScore <= COLOR_KEYS[2] && totalScore >= COLOR_KEYS[1]) {
      return COLOR_MAP[COLOR_KEYS[2]];
    } else if (totalScore <= COLOR_KEYS[1] && totalScore >= COLOR_KEYS[0]) {
      return COLOR_MAP[COLOR_KEYS[1]];
    } else if (totalScore <= COLOR_KEYS[0] && totalScore >= 0) {
      return COLOR_MAP[COLOR_KEYS[0]];
    } else {
      return COLOR_MAP[COLOR_KEYS[0]];
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
      setFun(INITIAL_STATUS);
      setFeed(INITIAL_STATUS);
      setAttention(INITIAL_STATUS);
      setSleep(INITIAL_STATUS);
      setToilet(INITIAL_STATUS);
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
