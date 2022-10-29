import './logo.css';
import logo from '../../../assets/logo.png';

export default function Logo() {
  return (
    <div className="app-logo">
      <img src={logo} alt="Logo" className="app-logo__img" />
      <h1 className="app-logo__title">PetShop</h1>
    </div>
  );
}
