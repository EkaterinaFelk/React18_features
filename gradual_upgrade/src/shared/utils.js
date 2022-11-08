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
