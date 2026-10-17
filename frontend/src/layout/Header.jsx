import { Link } from 'react-router';
import CafecitoLogo from '../components/CafecitoLogo.jsx';

function Header() {
  return <header className="cafecito-header">
    <nav className="container">
      <h1 className="cafecito-logo">
        <span className="visually-hidden">Cafecito Feliz</span>
        <CafecitoLogo height={44} aria-hidden="true" focusable="false" />
      </h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
      </ul>
    </nav>
  </header>;
}

export default Header;
