Sprint 4 — Definition of Done del POS

## 1. Definition of Done (aplica a TODAS las historias)

- [ ] Cumple con los criterios de aceptación de la historia, incluye casos de error, y cada uno se prueba a mano.
- [ ] Los errores responden con el status del Contrato de API y Edge Cases. El cuerpo de la respuesta es JSON { error, details | message }, status: 400 para reglas de negocio (no hay suficiente stock, el cliente no existe en la venta), 422 para validaciones, 404 para recurso no encontrado por ID, 401 si no hay token o es inválido, 403 sin permisos.
- [ ] Cada endpoint nuevo o modificado tiene sus requests en la colección bruno/, se cubren todas las de los criterios de aceptación de la historia que se agregaron o modificaron.
- [ ] Lo que la historia escribe se verifica en MongoDB con `mongosh` o MongoDB Compass (los registros se crean, el stock baja, purchasesCount del cliente sube), y en los casos de error se verifica que la base de datos no se modifica.
- [ ] No se rompe lo que ya había pasado a Done. La /api sigue respondiendo {"status": "ok"}, las rutas siguen cargando en frontend, las peticiones de la colección siguen respondiendo igual que cuando pasaron a Done.
- [ ] `npm run lint` pasa en backend y frontend, y `npm run build` pasa en frontend. No hay console.log de depuración ni código de depuración.
- [ ] La app corre desde main con `npm run dev`.

---

## 2. Plan de validación para historias

Las peticiones llevan `Authorization: Bearer <token>`, que es el que devuelve `POST /api/auth/login`, con el vendedor del seed (Victor Carmelo). La api corre en `http://localhost:3001/api`, la base de datos es `cafecito-pos`. Las peticiones están en la colección bruno/ en la raíz del repo. Se usa Bruno en lugar de Postman porque guarda cada request como un archivo de texto en el repo, se pueden guardar los cambios en el PR, y no requiere cuenta ni sincronización en la nube. Se corren desde la raíz con `npm run test:api -- <path-del-endpoint>/<nombre-del-request>.bru` por ejemplo `npm run test:api -- sales/customer-with-3-sales.bru`.

Productos del seed que se usan: Café Americano ($40, stock 6), Café Latte ($45, stock 20) y Capuchino ($50, stock 0). Antes de cada historia se corre `npm run seed` en `backend/` para partir del mismo stock, y después de cada npm run seed, consulta los _id con db.products.find({}, { name: 1 }) y úsalos en lugar de <Americano>, <Latte> y <Capuchino>.

### Validación 1: Registrar cliente (Historia 5 del backlog (issue #6))

Esta sí está en el sprint actual.

Tipo de prueba: Integración (backend <-> base de datos) y E2E a mano desde el formulario de `/clientes`.

Qué validar:

- Un cliente nuevo con nombre y teléfono válidos se crea con purchasesCount: 0.
- Cliente duplicado (mismo phoneOrEmail) regresa el que ya existe con 200, no 400 (así el vendedor ve sus compras acumuladas). No se crea otro registro.
- Nombre de menos de 2 caracteres, nombre de más de 100, o teléfono sin `+` → 422 (validación de campos).
- Sin token → 401.

Cómo probar:

1. `POST /api/customers` con `{ "name": "María González", "phoneOrEmail": "+56987654321" }`.
2. En mongosh: `db.customers.find({ phoneOrEmail: "+56987654321" })`.
3. `POST /api/customers` con `{ "name": "Maria Guadalupe González", "phoneOrEmail": "+56987654321" }`, después `db.customers.countDocuments({ phoneOrEmail: "+56987654321" })`.
4. `POST /api/customers` con `"name": "X"`, después con un nombre de 101 caracteres, después con `"phoneOrEmail": "54499003980"`. Al final `db.customers.countDocuments()`.
5. Repetir el paso 1 sin el header `Authorization`.
6. En el navegador, en `/clientes`, registrar a `Al` con `+54499003980`. Después escribir `Patricia Campos` y dejar vacío el teléfono o correo.

Resultado esperado:

- Paso 1: regresa `201 Created` con id, `name: "María González"`, `phoneOrEmail: "+56987654321"` y `purchasesCount: 0`.
- Paso 2: un solo registro, con purchasesCount: 0.
- Paso 3: regresa `200 OK` con el mismo id y el nombre original (María González), no el nuevo. El conteo sigue en 1.
- Paso 4: regresa `422` en los tres, con `details` que dice si el error es en name o en phoneOrEmail. El conteo sigue en 1 (solo María).
- Paso 5: regresa `401` con `{ error, message }`.
- Paso 6: se ve `Cliente frecuente registrado: Al, ID de cliente: <id>, con número de teléfono: +54499003980. 0 compras acumuladas (Aún no hay descuento)`. Con el campo vacío el botón de registrar está deshabilitado.

---

### Validación 2: Crear venta con descuento (Historias 7 y 8 del backlog (issues #8 y #9))

No están en el sprint actual. La Historia 7 tiene criterios de lo que se ve en pantalla, pero la 8, que es donde se guarda la venta, todavía no tiene criterios de aceptación. Las reglas del backend salen del Contrato de API y de Edge Cases. Al refinar la Historia 8, estas validaciones pasan a ser sus criterios.

Tipo de prueba: Unitaria (el cálculo del descuento) e integración (backend <-> base de datos: la venta se guarda y cambia el stock y el cliente).

Qué validar:

- El descuento sale del purchasesCount que tenía el cliente antes de la venta: 0 → 0%, 1 a 3 → 5%, 4 a 7 → 10%, 8 o más → 15%. Se prueban los límites de cada rango.
- La venta guarda subtotal, descuento y total, baja el stock de cada producto y sube en 1 el purchasesCount del cliente.
- Venta sin cliente (`customerId: null`) no tiene descuento y no le suma compras a nadie.
- Cliente nuevo (0 compras) paga precio completo, el 5% le toca hasta su segunda compra.
- customerId que no existe → 400 (regla de negocio).

Cómo probar:

1. Unitaria: `calculateDiscount(n)` con n = 0, 1, 3, 4, 7, 8 y 20.
2. Registrar a `Rocío Miranda` con `POST /api/customers` y dejarla con 3 compras: `db.customers.updateOne({ name: "Rocío Miranda" }, { $set: { purchasesCount: 3 } })`.
3. `POST /api/sales` con `{ "customerId": "<id de Rocío>", "items": [ { "productId": "<Americano>", "quantity": 2 }, { "productId": "<Latte>", "quantity": 1 } ] }`.
4. En mongosh: `db.customers.findOne({ name: "Rocío Miranda" })`, `db.products.find({ name: { $in: ["Café Americano", "Café Latte"] } })` y `db.sales.find().sort({ createdAt: -1 }).limit(1)`.
5. Repetir el paso 3 con `"customerId": null`, y después con un cliente recién registrado (0 compras).
6. `POST /api/sales` con `{ "customerId": "000000000000000000000000", "items": [ { "productId": "<Latte>", "quantity": 1 } ] }` (id con formato válido pero que no existe; el Latte tiene stock de sobra, así el único error es el cliente).

Resultado esperado:

- Paso 1: 0, 5, 5, 10, 10, 15 y 15.
- Paso 2: es preparación. `POST /api/customers` regresa `201` y `updateOne` regresa `modifiedCount: 1`. Si no, el paso 3 no sirve.
- Paso 3: regresa `201 Created` con `subtotal: 125`, `discountPercent: 5`, `discountAmount: 6.25` y `total: 118.75`.
- Paso 4: Rocío queda con purchasesCount: 4, el Americano baja de 6 a 4 y el Latte de 20 a 19. La venta guardada tiene los mismos totales que regresó el paso 3.
- Paso 5: regresa `201` con `discountPercent: 0` y `total: 125` en los dos. Sin cliente nadie cambia su purchasesCount, el cliente nuevo pasa de 0 a 1.
- Paso 6: regresa `400` con un error de cliente que no existe (no de stock). No se crea la venta y el stock no cambia (se revisa en mongosh).

---

### Validación 3: Validar stock insuficiente (caso de error de la Historia 8 del backlog (issue #9))

No es una historia del backlog: es un caso de error de la Historia 8, que todavía no tiene criterios de aceptación. La Historia 4 cubre el lado del carrito frontend (no deja subir la cantidad arriba del stock), pero esta validación es para la API, que tiene que rechazar la venta si desde el frontend se manda el caso de error o alguien hace el request al endpoint directamente. Las reglas salen de Edge Cases. Al refinar la Historia 8, pasan a ser sus criterios.

Tipo de prueba: Integración (backend <-> base de datos), caso de error. Lo importante es comprobar en la base de datos que nada cambia.

Qué validar:

- quantity mayor a stock regresa error: 400 Insufficient stock, productName: <producto>, available: <stock>, requested: <quantity>, message: <descripción-del-error>
- Si en un solo item el quantity es mayor que el stock, se rechaza toda la venta, no baja el stock de los items que sí pasan la validación.
- Producto con stock 0 → 400 (regla de negocio).
- Límite: pedir exactamente el stock disponible sí se vende y deja el stock en 0.
- `quantity: 0` o `items: []` → 422 (validación de campos, no regla de negocio). Se rechazan antes de revisar el stock, no deben regresar 400 Insufficient stock.

Cómo probar:

1. Antes, anotar `db.products.find({}, { name: 1, stock: 1 })` y `db.sales.countDocuments()`.
2. `POST /api/sales` con `{ "items": [ { "productId": "<Americano>", "quantity": 7 } ] }`.
3. `POST /api/sales` con `{ "items": [ { "productId": "<Latte>", "quantity": 1 }, { "productId": "<Americano>", "quantity": 7 } ] }`.
4. `POST /api/sales` con `{ "items": [ { "productId": "<Capuchino>", "quantity": 1 } ] }`.
5. `POST /api/sales` con `{ "items": [ { "productId": "<Latte>", "quantity": 0 }, { "productId": "<Americano>", "quantity": 7 } ] }` y luego con `{ "items": [] }`.
6. Repetir la consulta del paso 1.
7. `POST /api/sales` con `{ "items": [ { "productId": "<Americano>", "quantity": 6 } ] }`.

Resultado esperado:

- Paso 1: es preparación, solo se anota el stock y el número de ventas para compararlo en el paso 6.
- Paso 2: `400` con `{ "error": "Insufficient stock", "details": [ { "productId": "<Americano>", "productName": "Café Americano", "available": 6, "requested": 7, "message": "Only 6 available, requested 7" } ] }`.
- Paso 3: regresa `400` con el mismo `details` del paso 2 (Americano, available: 6, requested: 7). El Latte sí alcanzaba, pero se rechaza toda la venta.
- Paso 4: regresa `400` con `available: 0`, `requested: 1`.
- Paso 5: regresa `422` con `details` en `items[0].quantity` (por quantity: 0) y en `items` (por el array vacío). Aunque el Americano no alcanza, regresa 422 y no 400: la validación de campos va antes que el stock.
- Paso 6: todo igual que en el paso 1. El Latte sigue en 20, el Americano en 6, el Capuchino en 0, y no hay ventas nuevas.
- Paso 7: regresa `201 Created`; el Americano queda en stock 0 (se revisa en mongosh).
