import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService.js';
import { ERROR_MESSAGES } from '../../constants/errorMessages.js';

function ProductsList({ loading, error, products }) {
  if (loading) return <div>
    <p>Cargando productos...</p>
    <progress />
  </div>;
  if (error) return <article>{ error }</article>;
  if (products.length === 0) {
    return <article> {ERROR_MESSAGES.PRODUCTS_EMPTY } </article >;
  }
  return (
    <>
      <table className="striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Existencia</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => {
              return (
                <tr key={product.id} aria-disabled={ product.stock === 0 }>
                  <td>{product.name}</td>
                  <td>{new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN'
                  }).format(product.price)}</td>
                  <td>{product.stock === 0
                    ? 'Sin stock'
                    : product.stock
                  }</td>
                  <td>
                    <button disabled={product.stock === 0}>
                      Agregar</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

const getErrorMessage = (err) => {
  return err.kind === 'NETWORK'
    ? ERROR_MESSAGES.NETWORK
    : ERROR_MESSAGES.PRODUCTS_LOADING_ERROR;
};

function Sales() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProducts();
        if (cancelled) return;

        setProducts(response.data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadProducts();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <h1>Ventas</h1>
      <ProductsList loading={loading} error={error} products={products} />
    </>
  );
}

export default Sales;
