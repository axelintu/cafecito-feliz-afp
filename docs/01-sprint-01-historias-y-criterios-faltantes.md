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
