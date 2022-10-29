import { createContext } from 'react';
import { THEMES } from '../../constants/themes';

export const ThemeContext = createContext({
  theme: THEMES.list,
  toggleTheme: () => null
});

export default ThemeContext;
