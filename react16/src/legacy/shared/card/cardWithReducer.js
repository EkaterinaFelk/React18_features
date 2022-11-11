import React, { memo, useEffect, useMemo, useCallback, useReducer } from 'react';
import StatusBar from '../statusBar/statusBar';
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

function reducer(state, { type, settings }) {
  switch (type) {
    case 'actionFeed': {
      return {
        ...state,
        feed: state.feed + ADDED_DIFF,
        toilet: state.toilet - settings.toilet,
        sleep: state.sleep - settings.sleep,
        attention: state.attention + settings.attention,
        fun: state.fun - settings.fun
      };
    }
    case 'actionFun': {
      return {
        ...state,
        fun: state.fun + ADDED_DIFF,
        feed: state.feed - settings.feed,
        toilet: state.toilet - settings.toilet,
        sleep: state.sleep - settings.sleep,
        attention: state.attention + settings.attention
      };
    }
    case 'actionSleep': {
      return {
        ...state,
        sleep: state.sleep + ADDED_DIFF,
        fun: state.fun - settings.fun,
        feed: state.feed - settings.feed,
        toilet: state.toilet - settings.toilet,
        attention: state.attention + settings.attention
      };
    }
    case 'actionToilet': {
      return {
        ...state,
        toilet: state.toilet + ADDED_DIFF,
        sleep: state.sleep - settings.sleep,
        fun: state.fun - settings.fun,
        feed: state.feed - settings.feed,
        attention: state.attention - settings.attention
      };
    }
    case 'actionAttention': {
      return {
        ...state,
        attention: state.attention + ADDED_DIFF,
        toilet: state.toilet - settings.toilet,
        sleep: state.sleep - settings.sleep,
        fun: state.fun + settings.fun,
        feed: state.feed - settings.feed
      };
    }
    case 'feed': {
      return {
        ...state,
        feed: state.feed - settings.feed
      };
    }
    case 'fun': {
      return {
        ...state,
        fun: state.fun - settings.fun
      };
    }
    case 'sleep': {
      return {
        ...state,
        sleep: state.sleep - settings.sleep
      };
    }
    case 'toilet': {
      return {
        ...state,
        toilet: state.toilet - settings.toilet
      };
    }
    case 'attention': {
      return {
        ...state,
        attention: state.attention - settings.attention
      };
    }
    case 'initialStatus': {
      return {
        attention: INITIAL_STATUS,
        toilet: INITIAL_STATUS,
        sleep: INITIAL_STATUS,
        fun: INITIAL_STATUS,
        feed: INITIAL_STATUS
      };
    }

    default:
      return state;
  }
}

const CardWithReducer = memo(({ pet, onAdd }) => {
  const [state, dispatchState] = useReducer(reducer, {
    fun: INITIAL_STATUS,
    feed: INITIAL_STATUS,
    sleep: INITIAL_STATUS,
    toilet: INITIAL_STATUS,
    attention: INITIAL_STATUS
  });

  const settingsFun = useMemo(() => getPetSettings(pet.statuses, 'fun'), [pet.statuses]);
  const settingsFeed = useMemo(() => getPetSettings(pet.statuses, 'feed'), [pet.statuses]);
  const settingsSleep = useMemo(() => getPetSettings(pet.statuses, 'sleep'), [pet.statuses]);
  const settingsToilet = useMemo(() => getPetSettings(pet.statuses, 'toilet'), [pet.statuses]);
  const settingsAttention = useMemo(
    () => getPetSettings(pet.statuses, 'attention'),
    [pet.statuses]
  );

  const settings = useMemo(
    () => ({
      fun: settingsFun.diff,
      feed: settingsFeed.diff,
      sleep: settingsSleep.diff,
      toilet: settingsToilet.diff,
      attention: settingsAttention.diff
    }),
    [
      settingsAttention.diff,
      settingsFeed.diff,
      settingsFun.diff,
      settingsSleep.diff,
      settingsToilet.diff
    ]
  );

  const dispatch = useDispatch();
  const setTotalScore = useCallback(
    (totalScore) => dispatch({ type: 'setTotalScore', data: { id: pet.id, totalScore } }),
    [dispatch, pet.id]
  );

  const doAction = useCallback(
    (action) => {
      if (isReadyToAction(state.feed, state.fun, state.sleep, state.toilet, state.attention)) {
        switch (action) {
          case 'feed':
            dispatchState({ type: 'actionFeed', settings });
            break;
          case 'fun':
            dispatchState({ type: 'actionFun', settings });
            break;
          case 'sleep':
            dispatchState({ type: 'actionSleep', settings });
            break;
          case 'toilet':
            dispatchState({ type: 'actionToilet', settings });
            break;
          case 'attention':
            dispatchState({ type: 'actionAttention', settings });
            break;

          default:
            break;
        }
      }
    },
    [settings, state.attention, state.feed, state.fun, state.sleep, state.toilet]
  );

  useEffect(() => {
    const { clear } = requestInterval(() => {
      const action = ACTIONS[getRandomInt(0, ACTIONS.length)];
      doAction(action);
    }, 5000);
    if (isReadyToCancelAction(state.feed, state.fun, state.sleep, state.toilet, state.attention)) {
      clear();
    }
    return () => clear();
  }, [doAction, state.attention, state.feed, state.fun, state.sleep, state.toilet]);

  useEffect(() => {
    const clear = createPropertyInterval(
      state.fun,
      () => dispatchState({ type: 'fun', settings: { fun: settingsFun.diff } }),
      settingsFun.interval
    );
    return () => clear();
  }, [settingsFun.diff, settingsFun.interval, state.fun]);

  useEffect(() => {
    const clear = createPropertyInterval(
      state.feed,
      () => dispatchState({ type: 'feed', settings: { feed: settingsFeed.diff } }),
      settingsFeed.interval
    );
    return () => clear();
  }, [settingsFeed.diff, settingsFeed.interval, state.feed]);

  useEffect(() => {
    const clear = createPropertyInterval(
      state.sleep,
      () => dispatchState({ type: 'sleep', settings: { sleep: settingsSleep.diff } }),
      settingsSleep.interval
    );
    return () => clear();
  }, [settingsSleep.diff, settingsSleep.interval, state.sleep]);

  useEffect(() => {
    const clear = createPropertyInterval(
      state.toilet,
      () => dispatchState({ type: 'toilet', settings: { toilet: settingsToilet.diff } }),
      settingsToilet.interval
    );
    return () => clear();
  }, [settingsToilet.diff, settingsToilet.interval, state.toilet]);

  useEffect(() => {
    const clear = createPropertyInterval(
      state.attention,
      () => dispatchState({ type: 'attention', settings: { attention: settingsAttention.diff } }),
      settingsAttention.interval
    );
    return () => clear();
  }, [settingsAttention.diff, settingsAttention.interval, state.attention]);

  const totalScore = useMemo(
    () =>
      (100 * (state.fun + state.feed + state.sleep + state.attention + state.toilet)) /
      (INITIAL_STATUS * 5),
    [state.attention, state.feed, state.fun, state.sleep, state.toilet]
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
      dispatchState({ type: 'initialStatus' });
    }, 0);
  }, [onAdd]);

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
        <StatusBar key={status.status} title={status.status} value={state[status.status]} />
      ))}
      <button className="app-card__btn" onClick={handleAdd}>
        Make happy
      </button>
    </div>
  );
});

export default CardWithReducer;
