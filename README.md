# Cafecito Feliz

Este es un monorepo del proyecto de punto de venta Cafecito Feliz con los proyectos de frontend y backend.

## Estructura del proyecto

```
├── backend
│   ├── .env.example
│   ├── app.js
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── config
│       │   ├── db.conf.js
│       │   └── seed.js
│       ├── controllers
│       ├── models
│       │   └── Product.js
│       ├── routes
│       └── services
├── frontend
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── favicon.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   ├── layout
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.css
│   │   │   └── Layout.jsx
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── Customers
│   │   │   │   └── Customers.jsx
│   │   │   ├── Home
│   │   │   │   └── Home.jsx
│   │   │   ├── Products
│   │   │   │   └── Products.jsx
│   │   │   └── Sales
│   │   │       └── Sales.jsx
│   │   ├── services
│   │   │   └── apiClient.js
│   │   └── styles
│   │       └── styles.css
│   └── vite.config.js
├── LICENSE
├── mise.toml
├── mprocs.yaml
├── package.json
├── package-lock.json
└── README.md
```

## Requerimientos

- Node 24. El repo lo configura en `mise.toml`, si se tiene [mise](https://mise.jdx.dev) instalado, (`mise install`).  
  Sin mise instala Node 24 manualmente. El mínimo es Node v22.12.0. (Mongoose requiere v20 pero ya está como EOL, vite requiere v22.12.0)
- npm
- MongoDB si corres la base de datos local para development, o un string de conexión de MongoDB Atlas si lo prefieres.

## Instalación

- Backend: `cd backend && npm i`
- Frontend: `cd frontend && npm i`
- Script para llenar la base de datos: `cd backend && npm run seed`.

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
```

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

## Estilo de código

Cada app tiene su propio ESLint con reglas de
[ESLint Stylistic](https://eslint.style):

- Comillas simples en JavaScript; dobles en atributos JSX.
- Punto y coma al final de cada sentencia de código.
- 80 caracteres por línea como sugerencia: el lint avisa, pero no falla.

El acomodo de las líneas queda a criterio de quien escribe, se prioriza la lectura del código; no hay formateador.

Revisar, desde `backend/` o `frontend/`:

```
npm run lint
```

Corregir lo que se puede arreglar en automático:

```
npx eslint . --fix
```

## Proceso de los issues

Cada historia de usuario (en la rama entregables, carpeta docs/) es un issue en el repo, con sus propios criterios de aceptación. Sin ellos una historia no se puede pasar a "In Progress".

El número del issue no coincide con el de la historia, porque los PR comparten la numeración con los issues. Cada issue se titula `Historia <N>: <nombre>`; para saber qué número poner en el PR, busca la historia por su título en los issues o en el tablero. Por ejemplo, la Historia 1 (login) es el issue #2.

Cada historia se trabaja en su rama `feature/<historia-del-backlog-en-infinitivo>` y se integra mediante un PR. En la descripción del PR se pone `Closes #<issue>`, por ejemplo `Closes #2` para la historia del login. Al mergear, GitHub cierra el issue y el [tablero de GitHub Projects](https://github.com/users/axelintu/projects/1/) lo pasa a Done.

Los cambios que no son historias (`chore/`, `fix/`, `docs/`) también entran por PR, pero sin `Closes`.

Los merges se hacen con merge commit, no squash, para mantener el historial de los commits.

## Dónde reportar errores

https://github.com/axelintu/cafecito-feliz-afp/issues
