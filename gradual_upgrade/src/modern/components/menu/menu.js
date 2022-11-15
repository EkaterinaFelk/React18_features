import './menu.css';
import { NavLink } from 'react-router-dom';
import { ROUTE_URLS } from '../../../constants/routes';

export default function Menu() {
  return (
    <menu className="app-menu">
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'app-menu__item-active' : 'app-menu__item')}
          to={ROUTE_URLS.reactLegacy}
        >
          React Legacy
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'app-menu__item-active' : 'app-menu__item')}
          to={ROUTE_URLS.reactModern}
        >
          React Modern
        </NavLink>
      </li>
    </menu>
  );
}
