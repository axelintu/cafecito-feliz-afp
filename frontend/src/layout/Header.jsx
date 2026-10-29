import { Link, useLocation } from 'react-router';
import CafecitoLogo from '../components/CafecitoLogo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { isSessionExpired } from '../utils/auth.js';
import { ROLE_NAMES } from '../constants/roles.js';

function Menu({ children, type, className, enableMenu = true }) {
  const navClass = [
    'container-fluid',
    type && `${type}-container`,
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass}>
      {children}
      {enableMenu && (
        <ul className={`${type ? type + '-menu' : ''}`}>
          <li><Link to="/ventas">Ventas</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
        </ul>
      )}
    </nav>
  );
}

function Header() {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const hasSession =
    isAuthenticated
    && pathname !== '/login'
    && !isSessionExpired();
  return (
    <>
      <header className="cafecito-header header-block">
        <Menu type="desktop" enableMenu={hasSession}>
          <h1 className="cafecito-logo">
            <span className="visually-hidden">Cafecito Feliz</span>
            <CafecitoLogo height={44} aria-hidden="true" focusable="false" />
          </h1>
          {
            hasSession && <div className="logged-in-greet">
              Hola, {`${user.firstName} (${ROLE_NAMES[user.role]})`}
            </div>
          }
        </Menu>
      </header>
      {hasSession && <Menu className="header-block" type="mobile" />}
    </>
  );
}

export default Header;
