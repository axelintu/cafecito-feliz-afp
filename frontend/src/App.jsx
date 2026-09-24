import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/Home.jsx';
import Ventas from './pages/Ventas/Ventas.jsx';
import Layout from './layout/Layout.jsx';
import Productos from './pages/Productos/Productos.jsx';
import Clientes from './pages/Clientes/Clientes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ventas' element={<Ventas />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/clientes' element={<Clientes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
