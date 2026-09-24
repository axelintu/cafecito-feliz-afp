import { Link } from 'react-router';
function Header() {
  return <nav>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/ventas'>Ventas</Link></li>
      <li><Link to='/productos'>Productos</Link></li>
      <li><Link to='/clientes'>Clientes</Link></li>
    </ul>
  </nav>
}

export default Header;
