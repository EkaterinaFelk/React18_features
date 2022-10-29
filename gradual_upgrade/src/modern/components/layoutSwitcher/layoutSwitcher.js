import './layoutSwitcher.css';
import listLayout from '../../../assets/list_layout.png';
import gridLayout from '../../../assets/grid_layout.png';
import { useContext, useMemo, useCallback } from 'react';
import ThemeContext from '../../shared/ThemeContext';

export default function LayoutSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const icon = useMemo(() => (theme === 'list' ? gridLayout : listLayout), [theme]);
  const changeLayout = useCallback(() => {
    if (theme === 'list') {
      setTheme('grid');
    } else {
      setTheme('list');
    }
  }, [setTheme, theme]);

  return (
    <div className="app-layout" onClick={changeLayout}>
      <img src={icon} alt="Layout" className="app-layout__img" />
    </div>
  );
}
