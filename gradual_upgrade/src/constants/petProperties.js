export const ACTIONS = ['fun', 'feed', 'sleep', 'toilet', 'attention'];

export const INITIAL_STATUS = 100;
export const COLOR_MAP = {
  10: '#f2612c6f',
  20: '#f29c2c6f',
  50: '#eff16e6f',
  100: '#6ef1b46f'
};
export const COLOR_KEYS = Object.keys(COLOR_MAP).map((val) => parseInt(val, 10));
export const ADDED_DIFF = 10;
