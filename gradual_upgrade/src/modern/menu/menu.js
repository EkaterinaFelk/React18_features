import './menu.css';
import { Link } from 'react-router-dom';
import { ROUTE_URLS } from '../../constants/routes';

export default function Menu() {
  return (
    <menu className="app-menu">
      <li className="app-menu__item">
        <Link to={ROUTE_URLS.react16}>React-16</Link>
      </li>
      <li className="app-menu__item">
        <Link to={ROUTE_URLS.react18}>React-18</Link>
      </li>
    </menu>
  );
}
