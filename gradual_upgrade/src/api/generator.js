import { useId } from 'react';

const NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'Morning',
  'Afternoon',
  'Evening',
  'Night'
];
const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'purple'];
const TYPES = [
  'mice',
  'cat',
  'dog',
  'snake',
  'rabbit',
  'squirrel',
  'pigeon',
  'goose',
  'owl',
  'butterfly',
  'fish',
  'horse',
  'pig',
  'chicken'
];

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomDiff(min, max) {
  return (getRandomInt(min, max) + Math.random()).toFixed(2);
}

export default function generateData(length) {
  return Array.from({ length }, () => {
    return {
      id: useId(),
      name: NAMES[getRandomInt(0, NAMES.length)],
      age: getRandomInt(0, 20),
      type: TYPES[getRandomInt(0, TYPES.length)],
      description: 'nice pet',
      hadOwner: false,
      color: COLORS[getRandomInt(0, COLORS.length)],
      statuses: [
        { status: 'fun', interval: getRandomInt(500, 5000), diff: getRandomDiff(1, 5) },
        { status: 'feed', interval: getRandomInt(2000, 6000), diff: getRandomDiff(1, 5) },
        { status: 'sleep', interval: getRandomInt(2000, 7000), diff: getRandomDiff(1, 5) },
        { status: 'toilet', interval: getRandomInt(1000, 3000), diff: getRandomDiff(1, 5) },
        { status: 'attention', interval: getRandomInt(1000, 3000), diff: getRandomDiff(1, 5) }
      ]
    };
  });
}
