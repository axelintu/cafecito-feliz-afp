Historia (backlog: #1)

Como vendedor quiero identificarme en el sistema para poder completar las ventas con los clientes.

Decisiones para MVP.
1. El endpoint para login será `POST /api/auth/login` y espera:
> ```json
> {
>   "email": "usuario@cafecitofeliz.com",
>   "password": "secret123"
> }
> ```
>
> Si las credenciales son correctas, regresa `200 OK`:
>
> ```json
> {
>   "token": "<JWT>"
> }
> ```
>
> El token se firma con `JWT_SECRET`, lleva `{ userId, name, role }` y vence según `JWT_EXPIRES_IN` (8h). No hay refresh token: cuando el token vence, el vendedor vuelve a iniciar sesión. Se eligen 8 horas porque cubren un turno completo: con 1 hora, el sistema sacaría al vendedor a media jornada y podría perder un carrito a medio cobrar. Una sesión larga es menos segura, pero el MVP corre en una caja, no expuesto en internet, y el token igual vence solo al día siguiente.
>
> Si las credenciales son incorrectas, regresa `401 Unauthorized` con la misma forma de error que el resto del contrato (`error` siempre; `message` o `details` según el caso):
>
> ```json
> {
>   "error": "Invalid credentials",
>   "message": "Email or password is incorrect"
> }
> ```
2. Los usuarios vienen de un seed con usuario de vendedor y admin. El registro de usuarios queda fuera del MVP. Los usuarios del seed serán Victor Carmelo, con email: `vendedor@cafecitofeliz.com` y contraseña `c1aveSegura` y Armin Feliciano `admin@cafecitofeliz.com` y contraseña `s3cretosDePassword`.
3. El token es JWT
4. El token ya trae el rol 
5. El logout quedaría fuera de esta historia.

Criterios:

- Dado que el sistema está sin iniciar sesión, cuando Victor Carmelo (vendedor) ingresa su correo `vendedor@cafecitofeliz.com` y su contraseña `c1aveSegura` y presiona `Entrar`, entonces el sistema entra, muestra en el encabezado `¡Hola! Victor (Vendedor)` y carga la página de ventas.
- Dado que el sistema está sin iniciar sesión, cuando Armin Feliciano (administrador) ingresa su correo `admin@cafecitofeliz.com` y su contraseña `s3cretosDePassword` y presiona `Entrar`, entonces el sistema entra, muestra en el encabezado `¡Hola! Armin (Administrador)` y carga la página de productos.
- Dado que existe el usuario `vendedor@cafecitofeliz.com`, cuando el vendedor ingresa ese correo con la contraseña `claveSegura` y presiona `Entrar`, entonces la API regresa el estado `401 Unauthorized` con `{ "error": "Invalid credentials", "message": "Email or password is incorrect" }`, el vendedor sigue en la pantalla de login, ve el mensaje `Correo o contraseña incorrectos` y el campo de contraseña se vacía.
- Dado que no existe el usuario `vendedora@cafecitofeliz.com`, cuando el vendedor ingresa ese correo con la contraseña `c1aveSegura` y presiona `Entrar`, entonces la API regresa el estado `401 Unauthorized` con el mismo cuerpo de error y el vendedor ve el mismo mensaje `Correo o contraseña incorrectos`, sin que el sistema indique si el correo existe o no.
- Dado que el vendedor está en la pantalla de login, cuando deja vacío el correo o la contraseña, entonces el botón `Entrar` está deshabilitado.
- Dado que la API recibe un `POST /api/auth/login` con `{ "email": "vendedor@cafecitofeliz.com" }` y sin `password`, cuando procesa la solicitud, entonces regresa el estado `422 Unprocessable Content` con `details` indicando que `password` es requerido.
- Dado que el sistema está sin iniciar sesión, cuando se abre directamente `/ventas`, `/productos` o `/clientes`, entonces el sistema redirige a `/login`.
- Dado que Victor Carmelo inició sesión hace 10 minutos y está en ventas, cuando recarga la página, entonces sigue en ventas con `¡Hola! Victor (Vendedor)` en el encabezado sin que se le vuelvan a pedir su correo y contraseña.
- Dado que Victor Carmelo ya inició sesión, cuando abre `/login`, entonces el sistema lo redirige a la página de ventas.
- Dado que Victor Carmelo inició sesión y su token ya venció, cuando recarga la página o abre `/ventas`, entonces el sistema lo manda a `/login` con el mensaje `Tu sesión expiró, vuelve a iniciar sesión`.
- Dado que se corrió el seed de usuarios, cuando se consulta la colección de usuarios en la base, entonces la contraseña de Victor Carmelo no está guardada como `c1aveSegura` sino como un hash.

Historia (backlog: #6)

Como vendedor quiero buscar un cliente para enlazarlo con sus compras y que acumule o aplique su descuento.

Decisiones para MVP.
1. Alcance: la historia termina al enlazar al cliente con la venta en curso en la pantalla de ventas. Sumarle la compra al cliente (`purchasesCount`) pasa al registrar la venta (historia 8) y aplicar el descuento al total es la historia 7; ninguna de las dos está en este sprint. Por eso los criterios muestran el descuento que le toca al cliente, pero no lo aplican a ningún total.
2. La búsqueda usa `GET /api/customers?q=<texto>` del contrato. Es el primer endpoint que pide token (`Authorization: Bearer`), para vendedor y admin.
3. `q` busca por coincidencia parcial en nombre, teléfono o correo, sin distinguir mayúsculas ni acentos (la misma collation que la búsqueda de productos de la historia 3).
4. Cada cliente de la respuesta trae además `discountPercent` (`0`, `5`, `10` o `15`). El contrato dice que el backend calcula el descuento y el frontend solo lo muestra, pero la respuesta del contrato no trae el porcentaje; se agrega para que el frontend no repita la regla.
5. La búsqueda empieza a partir de 2 caracteres.
6. El seed agrega los clientes `María González` (`+56987654321`, 3 compras), `Mario Gómez` (`mariogomez@correo.com`, 0 compras) y `Rocío Miranda` (`rocio.miranda@correo.com`, 8 compras).

Criterios:

- Dado que existen los clientes `María González`, `Mario Gómez` y `Rocío Miranda`, cuando el vendedor escribe `mar` en la búsqueda de clientes de la pantalla de ventas, entonces se muestran `María González` con `+56987654321` y `Mario Gómez` con `mariogomez@correo.com`, y no se muestra `Rocío Miranda`.
- Dado que existe la clienta `Rocío Miranda`, cuando el vendedor escribe `rocio` en la búsqueda de clientes, entonces se muestra `Rocío Miranda` aunque el texto no lleve acento.
- Dado que existe la clienta `María González` con el teléfono `+56987654321`, cuando el vendedor escribe `+56987654321` en la búsqueda de clientes, entonces se muestra `María González`.
- Dado que no existe ningún cliente llamado `Pedro`, cuando el vendedor escribe `Pedro` en la búsqueda de clientes, entonces la API regresa el estado `200 OK` con `data: []` y `total: 0`, y el vendedor ve el mensaje `No hay clientes que coincidan con "Pedro"` y un botón `Registrar cliente` que lo lleva al registro de clientes.
- Dado que el vendedor está en la búsqueda de clientes, cuando escribe solo `m`, entonces no se hace la búsqueda y el vendedor ve el mensaje `Escribe al menos 2 caracteres`.
- Dado que la búsqueda muestra a `María González`, cuando el vendedor la selecciona, entonces la venta en curso queda enlazada con ella, la búsqueda se oculta y el vendedor ve `Cliente: María González, 3 compras acumuladas (5% de descuento)`.
- Dado que la búsqueda muestra a `Mario Gómez`, cuando el vendedor lo selecciona, entonces la venta en curso queda enlazada con él y el vendedor ve `Cliente: Mario Gómez, 0 compras acumuladas (Aún no hay descuento)`.
- Dado que la venta en curso está enlazada con `María González`, cuando el vendedor presiona `Cambiar cliente`, busca `rocio` y selecciona a `Rocío Miranda`, entonces la venta queda enlazada con ella y el vendedor ve `Cliente: Rocío Miranda, 8 compras acumuladas (15% de descuento)`.
- Dado que la venta en curso está enlazada con `María González`, cuando el vendedor presiona `Quitar cliente`, entonces la venta queda sin cliente y vuelve a aparecer la búsqueda de clientes.
- Dado que la API recibe un `GET /api/customers?q=mar` sin el header `Authorization`, cuando procesa la solicitud, entonces regresa el estado `401 Unauthorized` con `{ "error": "Authentication required", "message": "Missing authorization token" }`.
