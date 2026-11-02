import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home/Home.jsx';
import Customers from './pages/Customers/Customers.jsx';
import Products from './pages/Products/Products.jsx';
import Sales from './pages/Sales/Sales.jsx';
import Login from './pages/Login/Login.jsx';
import Layout from './layout/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<ProtectedRoute guestOnly>
              <Login /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute>
              <Home /></ProtectedRoute>} />
            <Route path="/ventas" element={<ProtectedRoute>
              <Sales /></ProtectedRoute>} />
            <Route path="/productos" element={<ProtectedRoute>
              <Products /></ProtectedRoute>} />
            <Route path="/clientes" element={<ProtectedRoute>
              <Customers /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
