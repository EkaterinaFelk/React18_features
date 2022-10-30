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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function generateData(length) {
  return JSON.stringify(
    Array.from({ length }, (_, i) => {
      return {
        id: i,
        name: NAMES[getRandomInt(0, NAMES.length)],
        age: getRandomInt(0, 20),
        type: TYPES[getRandomInt(0, TYPES.length)],
        description: 'nice pet',
        hadOwner: false,
        color: COLORS[getRandomInt(0, COLORS.length)],
        statuses: [
          { status: 'fun', interval: getRandomInt(1000, 5000), diff: getRandomInt(1, 10) },
          { status: 'feed', interval: getRandomInt(500, 2000), diff: getRandomInt(1, 15) },
          { status: 'sleep', interval: getRandomInt(1000, 7000), diff: getRandomInt(1, 10) },
          { status: 'toilet', interval: getRandomInt(1000, 3000), diff: getRandomInt(1, 5) },
          { status: 'attention', interval: getRandomInt(500, 3000), diff: getRandomInt(1, 10) }
        ]
      };
    })
  );
}
