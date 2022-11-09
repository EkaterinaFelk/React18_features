import { ADDED_DIFF, INITIAL_STATUS } from './constants/petProperties';

export const setCustomInterval = (callback, delay) => {
  const timerRef = { id: null };
  const timeout = () => {
    timerRef.id = setTimeout(() => {
      callback();
      timeout();
    }, delay);
  };
  timeout();
  return timerRef.id;
};

export const requestInterval = (fn, delay) => {
  let start = new Date().getTime();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let handle = { value: 0, clear: () => {} };

  function loop() {
    handle.value = window.requestAnimationFrame(loop);
    handle.clear = () => window.cancelAnimationFrame(handle.value);

    const current = new Date().getTime();
    const delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }
  }
  handle.value = window.requestAnimationFrame(loop);
  handle.clear = () => window.cancelAnimationFrame(handle.value);
  return handle;
};

export const createPropertyInterval = (property, callback, interval) => {
  let clearInterval;
  if (property >= 0) {
    const { clear } = requestInterval(callback, interval);
    clearInterval = clear;
  }
  return () => clearInterval && clearInterval();
};

export const getPetSettings = (pets, property) => pets.find((status) => status.status === property);

export const isReadyToAction = (feed, fun, sleep, toilet, attention) => {
  const level = INITIAL_STATUS - ADDED_DIFF;
  return feed <= level && fun <= level && sleep <= level && toilet <= level && attention <= level;
};

export const isReadyToCancelAction = (feed, fun, sleep, toilet, attention) => {
  return (
    feed <= ADDED_DIFF ||
    fun <= ADDED_DIFF ||
    sleep <= ADDED_DIFF ||
    toilet <= ADDED_DIFF ||
    attention <= ADDED_DIFF
  );
};

export const orderPets = (pets) => pets.sort((pet1, pet2) => pet1.totalScore - pet2.totalScore);

export const searchPets = (pets, search) =>
  pets.filter(
    ({ name, type, id }) =>
      id.toString().includes(search) || name.includes(search) || type.includes(search)
  );
