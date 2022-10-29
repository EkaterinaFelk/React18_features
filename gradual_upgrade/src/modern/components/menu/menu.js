import './menu.css';
import { NavLink } from 'react-router-dom';
import { ROUTE_URLS } from '../../../constants/routes';

export default function Menu() {
  return (
    <menu className="app-menu">
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'app-menu__item-active' : 'app-menu__item')}
          to={ROUTE_URLS.react16}
        >
          React-16
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'app-menu__item-active' : 'app-menu__item')}
          to={ROUTE_URLS.react18}
        >
          React-18
        </NavLink>
      </li>
    </menu>
  );
}
