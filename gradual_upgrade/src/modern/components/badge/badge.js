import './badge.css';
import badge from '../../../assets/badge.png';

export default function Badge({ counter }) {
  return (
    <div className="app-badge">
      <img src={badge} alt="Logo" className="app-badge__img" />
      <h1 className="app-badge__count">{counter}</h1>
    </div>
  );
}
