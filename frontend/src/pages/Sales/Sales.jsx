import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService.js';
import { ERROR_MESSAGES } from '../../constants/errorMessages.js';
import { PRODUCT_MESSAGES } from '../../constants/productMessages.js';

function SearchTerm({search}) {
  return <span className="search-term">"{search}"</span>;
};

function ProductsList({ loading, error, products, search }) {
  if (loading) return <div>
    <p>{PRODUCT_MESSAGES.LOADING}</p>
    <progress />
  </div>;
  if (error) return <article>{ error }</article>;
  if (products.length === 0 && search) {
    return <article>
      { PRODUCT_MESSAGES.SEARCH_EMPTY }
      <SearchTerm search={ search } />
    </article>;
  }
  if (products.length === 0 && !search) {
    return <article>
      {PRODUCT_MESSAGES.EMPTY}
    </article>;
  }
  return (
    <>
      <table className="striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Existencia</th>
            <th className="product-list-action">Acción</th>
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
                  <td className="product-list-action">
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
  const [search, setSearch] = useState('');
  const term = search.trim();

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setError(null);
        const response = await getProducts(term);
        if (cancelled) return;
        setProducts(response.data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const searchDebounce = setTimeout(loadProducts, term ? 300 : 0);
    return () => {
      cancelled = true;
      clearTimeout(searchDebounce);
    };
  }, [term]);

  return (
    <>
      <h1>Ventas</h1>

      <form role="search" className="group"
        onSubmit={(e) => e.preventDefault()}>
        <input type="search" aria-label="Buscar productos"
          placeholder="Busca productos"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <ProductsList loading={loading} error={error} products={products}
        search={term}
      />
    </>
  );
}

export default Sales;
