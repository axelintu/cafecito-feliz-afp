Sprint 1 — Historias refinadas y criterios

Instrucciones:

- Elige 5 historias del backlog.
- Escribe cada historia y debajo sus criterios.
- Usa el formato indicado.

Historia 1 (backlog: #2)

Como vendedor quiero ver la lista de productos disponibles para armar el carrito del cliente sin necesitar el nombre exacto del producto.

Criterios:

- Dado que el catálogo tiene productos activos con stock disponible, cuando el vendedor abre la pantalla de ventas, entonces se debe mostrar la lista de productos con su nombre, precio y stock.
- Dado que el catálogo tiene productos activos con stock y al menos uno activo con stock en 0, cuando el vendedor abre la pantalla de ventas, entonces los productos con stock se muestran normalmente y los de stock 0 aparecen con la etiqueta "Sin stock" y deshabilitados.
- Dado que el catálogo no tiene productos, cuando el vendedor abre la pantalla de ventas, entonces la API regresa status `200 OK` con `data: []` y `total: 0` y el frontend muestra el mensaje "No hay productos disponibles" en lugar de una pantalla de error.
- Dado que el catálogo tiene todos sus productos inactivos, cuando el vendedor abre la pantalla de ventas, entonces la API regresa status `200 OK` con `data: []` y `total: 0` y el frontend muestra el mensaje "No hay productos disponibles" en lugar de una pantalla de error.

Historia 2 (backlog: #3)

Como vendedor quiero buscar un producto por su nombre para agregarlo al carrito de inmediato cuando ya sé cuál es.

Criterios:

- Dado que el catálogo tiene los productos activos "Café Americano", "Café Latte" y "Té verde", cuando el vendedor escribe "cafe" en la búsqueda, entonces se muestran los productos cuyo nombre contiene ese texto, sin distinguir mayúsculas ni acentos, en este caso "Café Latte" y "Café Americano".
- Dado que el catálogo tiene productos activos pero no hay un producto "pizza", cuando el vendedor escribe "pizza", entonces la API regresa status `200 OK` con `data: []` y `total: 0`, y el frontend muestra el mensaje 'No hay productos que coincidan con "pizza"'.
- Dado que el vendedor buscó "café" y ve la lista filtrada, cuando el vendedor borra el término de búsqueda, entonces se muestra la lista completa de productos, la misma que aparece al abrir la pantalla.
- Dado que no hay productos activos en el catálogo, cuando el vendedor abre la pantalla de ventas, entonces la búsqueda se deshabilita.

Historia 3 (backlog: #4)

Como vendedor quiero modificar las cantidades y quitar productos del carrito para corregir el pedido antes de cobrarle al cliente.

Criterios:

- Dado que hay un carrito con dos productos: `1 x Café Americano ($40)` y `1 x Café Latte ($45)` y un subtotal de compra de `85`, cuando el vendedor escribe 2 en la cantidad de Café Americano, entonces el frontend actualiza el importe de la línea de ese producto (precio * cantidad): `80` y también actualiza el subtotal y total de compra a `125`.
- Dado que hay un carrito con dos productos: `1 x Café Americano ($40)` y `1 x Café Latte ($45)` y un subtotal de compra de `85`, cuando el vendedor sube el número de la cantidad de Café Americano a 2 usando el botón de `+`, entonces el frontend actualiza el importe de la línea de ese producto (precio * cantidad): `80` y también actualiza el subtotal y total de compra a `125`.
- Dado que hay un carrito con dos productos: `1 x Café Americano ($40)` y `1 x Café Latte ($45)` y un subtotal de compra de `85`, cuando el vendedor elimina `Café Americano` del carrito, entonces Café Americano desaparece de la lista y se actualiza el subtotal y total de compra a `45`.
- Dado que hay solo un producto en el carrito, cuando el vendedor elimina dicho producto, entonces el carrito muestra el mensaje "Carrito vacío, agrega productos para poder hacer la venta" y deshabilita el botón para seguir con el proceso de compra.
- Dado que hay un carrito con dos productos: `1 x Café Americano ($40)` y stock de 1, y `1 x Café Latte ($45)` y stock de 30, y un subtotal de compra de `85`, cuando el vendedor escribe la cantidad de Café Americano a 2 (un número mayor que el stock del producto), entonces el frontend muestra el mensaje "Cantidad excede el stock" y deshabilita el botón para seguir con el proceso de compra.
- Dado que hay un carrito con dos productos: `1 x Café Americano ($40)` y stock de 1, y `1 x Café Latte ($45)` y stock de 30, y un subtotal de compra de `85`, cuando el vendedor sube la cantidad de Café Americano a 2 con el botón de `+` (un número mayor que el stock del producto), entonces el frontend muestra el mensaje "Cantidad excede el stock" y deshabilita el botón para seguir con el proceso de compra.
- Dado que hay un carrito con tres productos: `2 x Café Americano ($40)`, `1 x Café Latte ($45)`, `1 x Té Verde ($35)` y los botones para aumentar cantidad `+` están activos para los tres productos, y los botones para disminuir cantidad `-` están desactivados para Café Latte, y para Té Verde, cuando el vendedor escribe la cantidad de Café Americano como `1`, entonces el botón de `-` Café Americano se deshabilita, quedan deshabilitados los tres botones de `-`.
- Dado que hay un carrito con tres productos: `2 x Café Americano ($40)`, `1 x Café Latte ($45)`, `1 x Té Verde ($35)` y los botones para aumentar cantidad `+` están activos para los tres productos, y los botones para disminuir cantidad `-` están desactivados para Café Latte, y para Té Verde, cuando el vendedor da click en el botón de `-` del Café Americano y baja a `1`, entonces el botón `-` de Café Americano se deshabilita, quedan deshabilitados los tres botones de `-`.
- Dado que hay un carrito con un producto: `1 x Café Latte ($45)`, cuando el vendedor escribe la cantidad `0` y sale del campo, entonces el frontend borra el `0` y vuelve al `1` y muestra un mensaje "Los productos no pueden tener cantidad = 0, si quieres eliminar el producto usa el botón de eliminar".
- Dado que hay un carrito con un producto: `3 x Café Latte ($45)`, cuando el vendedor escribe en el campo la cantidad un número o carácter inválido `-1 | a | % | 1.5` (negativo, una letra/símbolo, número fraccional, o lo deja vacío) y sale del campo, entonces el frontend borra el valor inválido y pone el último valor válido `3` y muestra el mensaje "Cantidad inválida".

Historia 4 (backlog: #5)

Como vendedor quiero registrar a un cliente con su nombre y su teléfono o correo para que empiece a acumular compras y acceda al descuento por recurrencia.

Criterios:

- Dado que no hay un cliente registrado con el teléfono `+56987654321`, cuando el vendedor registra a `María González`, con el teléfono: `+56987654321` y presiona registrar, entonces el vendedor ve en el mensaje `Cliente frecuente registrado: María González, ID de cliente: <id-creado>, con número de teléfono: +56987654321. 0 compras acumuladas (Aún no hay descuento)`.
- Dado que no hay un cliente registrado con el email `mariagong@alez.com`, cuando el vendedor registra a `María González` con el email: `mariagong@alez.com` y presiona registrar, entonces el vendedor ve en el mensaje `Cliente frecuente registrado: María González, ID de cliente: <id-creado>, con email: mariagong@alez.com. 0 compras acumuladas (Aún no hay descuento)`.
- Dado que hay un cliente registrado como `María González` con el teléfono: `+56987654321`, con ID: `cust-003` y 3 compras registradas, cuando el vendedor registra a `Maria Guadalupe González` con teléfono `+56987654321` y presiona registrar, entonces el vendedor ve en el mensaje `Cliente frecuente ya existe: María González, ID de cliente: cust-003, con número de teléfono: +56987654321, 3 compras acumuladas (5% de descuento).`.
- Dado que hay un cliente registrado como `María González` con email `mariagong@alez.com`, con ID: `cust-003` y 3 compras registradas, cuando el vendedor registra a `Maria Guadalupe González` con el email: `mariagong@alez.com` y presiona registrar, entonces el vendedor ve en el mensaje `Cliente frecuente ya existe: María González, ID de cliente: cust-003, con email: mariagong@alez.com. 3 compras acumuladas (5% de descuento).`.
- Dado que el vendedor está en el formulario de registro de clientes, cuando el vendedor registra a `恵 | 花 | 芽 | A | J` (Megumi, Hana, Mei, A, Jei), con teléfono: `+54499003980` y presiona registrar, entonces la API regresa el estado `422 Unprocessable Content` y el vendedor ve el mensaje `El nombre debe tener al menos 2 caracteres`.
- Dado que el vendedor está en el formulario de registro de clientes, cuando el vendedor registra a `Josue Martinez`, con teléfono: `54499003980` y presiona registrar, entonces la API regresa el estado `422 Unprocessable Content` y el vendedor ve el mensaje `Debe registrar un correo o teléfono válido (que comience con +)`.
- Dado que el vendedor está en el formulario de registro de clientes, cuando el vendedor registra a `Al`, con el teléfono `+54499003980` y presiona registrar, entonces el vendedor ve el mensaje `Cliente frecuente registrado: Al, ID de cliente: <id-creado>, con número de teléfono: +54499003980. 0 compras acumuladas (Aún no hay descuento)`.
- Dado que no hay un cliente registrado con el email `carlosantisimaecheverria@monteros.com`, cuando el vendedor registra a `Carlos de la Santísima Trinidad Maximiliano Echeverría de los Monteros de la Rosa y Costa de Albarrán` con el email: `carlosantisimaecheverria@monteros.com` y presiona registrar, entonces la API regresa el estado `422 Unprocessable Content` y el vendedor ve el mensaje `El nombre no puede tener más de 100 caracteres`.
- Dado que el vendedor está en el formulario de registro de clientes, cuando el vendedor escribe `Patricia Campos` y deja el campo de email/teléfono vacío, entonces el botón de registrar está deshabilitado.
