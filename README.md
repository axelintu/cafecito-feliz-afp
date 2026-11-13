# Cafecito Feliz

Este es un monorepo del proyecto de punto de venta Cafecito Feliz con los proyectos de frontend y backend.

## Estructura del proyecto

Solo las carpetas: los archivos cambian con cada historia, las carpetas casi no.

```
├── backend/              API REST con Express y Mongoose
│   └── src/
│       ├── config/       conexión a MongoDB y seeds
│       ├── controllers/  lógica de cada endpoint
│       ├── middleware/   errores en JSON, validación y logger
│       ├── models/       esquemas de Mongoose
│       ├── routes/       rutas bajo /api
│       └── utils/        helpers, con sus tests (*.test.js)
├── bruno/                requests de la API, un archivo por caso
├── frontend/             React con Vite
│   └── src/
│       ├── components/   piezas reutilizables, como ProtectedRoute
│       ├── constants/    mensajes, roles y redirecciones
│       ├── context/      la sesión (AuthContext)
│       ├── layout/       encabezado y menú
│       ├── pages/        una carpeta por pantalla
│       ├── services/     llamadas a la API con axios
│       └── utils/        manejo del token
├── mise.toml             versión de Node
└── mprocs.yaml           levanta las dos apps en una terminal
```

## Requisitos

- Node 24. El repo lo configura en `mise.toml`, si tienes [mise](https://mise.jdx.dev) instalado (`mise install`).  
  Sin mise instala Node 24 manualmente. El mínimo es Node v22.12.0. (Mongoose requiere v20 pero ya está como EOL, vite requiere v22.12.0)
- npm
- MongoDB si corres la base de datos local para development, o un string de conexión de MongoDB Atlas si lo prefieres.

## Instalación

Instala las dependencias de las tres carpetas. La raíz trae mprocs y Bruno CLI:

```shell
npm ci
cd backend && npm ci
cd ../frontend && npm ci
```

`npm ci` instala exactamente las versiones del `package-lock.json`. Usa
`npm i` solo para agregar o actualizar una dependencia.

Después de configurar las variables (siguiente sección), llena la base desde
`backend/`:

```shell
npm run seed
npm run seed:users
```

`seed` borra los productos y vuelve a crear los de ejemplo. `seed:users` hace
lo mismo con los usuarios.

## Configurar variables

En el directorio backend/, crea archivo .env
```
cp .env.example .env
```

Modifica estas variables de entorno:
```
PORT=3001
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/cafecito-pos
NODE_ENV=development
JWT_SECRET=agrega-tu-secreto
JWT_EXPIRES_IN=8h
SEED_SELLER_PASSWORD=cambia-esta-contrasena
SEED_ADMIN_PASSWORD=cambia-esta-contrasena
```

Genera el secreto del JWT_SECRET para `.env`. Debes generarlo en cada máquina usando este comando:

```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Agrega las contraseñas que se usarán para las pruebas en SEED_SELLER_PASSWORD y SEED_ADMIN_PASSWORD al archivo .env, para llenar la base de datos con el seed.

En desarrollo la API vive en http://localhost:3001/api. La raíz, 
http://localhost:3001/, responde 404 a propósito: no hay ruta declarada ahí.

En el directorio frontend/, crea archivo .env

```
cp .env.example .env
```
Modifica la variable de entorno:

```
VITE_API_URL=http://localhost:3001/api
```

En el frontend todo lo que empieza con `VITE_` aparece público porque se agrega 
al bundle del build, ahí no se agregan secretos.

## Correr el proyecto

Para levantar el proyecto frontend:

```shell
cd frontend && npm run dev
```

Para levantar el proyecto backend:

```shell
cd backend && npm run dev
```

Para correr ambos en la misma terminal puedes usar mprocs desde la raíz del monorepo: 

Instala la dependencia y corre desde la raíz:

```shell
npm i
npm run dev
```

## Entrar

El seed de usuarios crea dos cuentas, con las contraseñas que pusiste en el
`.env` del backend:

| Usuario | Correo | Contraseña | Entra a |
|---|---|---|---|
| Victor Carmelo (Vendedor) | `vendedor@cafecitofeliz.com` | `SEED_SELLER_PASSWORD` | `/ventas` |
| Armin Feliciano (Administrador) | `admin@cafecitofeliz.com` | `SEED_ADMIN_PASSWORD` | `/productos` |

Sin sesión, cualquier página manda a `/login`. La sesión dura lo que diga
`JWT_EXPIRES_IN` (8 horas); al vencer, vuelve a `/login` con un aviso.

## Pruebas

### Tests unitarios

Los helpers del backend tienen tests con `node --test`, el corredor que trae
Node, sin instalar nada. Cada `*.test.js` va junto al archivo que prueba.
Desde `backend/`:

```shell
npm test
```

No necesitan la base ni el servidor.

### Requests de la API

Los requests de la API están en una colección de [Bruno](https://www.usebruno.com)
en `bruno/`, con un archivo por caso: el exitoso y uno por cada error de los
criterios de la historia. Para usarla, abre la carpeta en Bruno
(Open Collection) y elige el environment `local`. Los requests que piden
sesión usan el token que guarda `auth/Login seller`; córrelo primero.

Para correr toda la colección desde la terminal, desde la raíz:

```shell
npm run test:api
```

Necesita:

- el backend levantado en el puerto 3001;
- la base recién llenada con `npm run seed` y `npm run seed:users`: los
  requests de productos esperan los 4 productos activos del seed.

Para correr solo una carpeta o un request, agrega su ruta dentro de `bruno/`:

```shell
npm run test:api -- products
npm run test:api -- health.bru
```

Cada request trae sus tests; si alguno falla, el comando termina con error.

## Estilo de código

Cada app tiene su propio ESLint con reglas de
[ESLint Stylistic](https://eslint.style):

- Comillas simples en JavaScript; dobles en atributos JSX.
- Punto y coma al final de cada sentencia de código.
- 80 caracteres por línea como sugerencia: el lint avisa, pero no falla.
- Tabs en `.js` y 2 espacios en `.jsx`, igual que el `.editorconfig`.

El acomodo de las líneas queda a criterio de quien escribe, se prioriza la lectura del código; no hay formateador.

Revisar, desde `backend/` o `frontend/`:

```
npm run lint
```

Corregir lo que se puede arreglar en automático:

```
npx eslint . --fix
```

En el frontend, antes de abrir un PR corre también el build:

```shell
npm run build
```

ESLint no revisa que lo que importas exista: un `import` de algo que no se
exporta pasa el lint, pero rompe el build y deja la página en blanco.

## Proceso de los issues

Cada historia de usuario (en la rama entregables, carpeta docs/) es un issue en el repo, con sus propios criterios de aceptación. Sin ellos una historia no se puede pasar a "In Progress".

El número del issue no coincide con el de la historia, porque los PR comparten la numeración con los issues. Cada issue se titula `Historia <N>: <nombre>`; para saber qué número poner en el PR, busca la historia por su título en los issues o en el tablero. Por ejemplo, la Historia 1 (login) es el issue #2.

Cada historia se trabaja en su rama `feature/<historia-del-backlog-en-infinitivo>` y se integra mediante un PR. En la descripción del PR se pone `Closes #<issue>`, por ejemplo `Closes #2` para la historia del login. Al mergear, GitHub cierra el issue y el [tablero de GitHub Projects](https://github.com/users/axelintu/projects/1/) lo pasa a Done.

Los cambios que no son historias (`chore/`, `fix/`, `docs/`) también entran por PR, pero sin `Closes`.

Los merges se hacen con merge commit, no squash, para mantener el historial de los commits.

## Dónde reportar errores

https://github.com/axelintu/cafecito-feliz-afp/issues
