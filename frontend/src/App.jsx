import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/Home.jsx';
import Customers from './pages/Customers/Customers.jsx';
import Products from './pages/Products/Products.jsx';
import Sales from './pages/Sales/Sales.jsx';
import Login from './pages/Login/Login.jsx';
import Layout from './layout/Layout.jsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ventas" element={<Sales />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/clientes" element={<Customers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
