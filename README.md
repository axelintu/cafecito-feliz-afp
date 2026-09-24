# Cafecito Feliz

Este es un monorepo del proyecto de punto de venta Cafecito Feliz con los proyectos de frontend y backend.

## Estructura del proyecto

```
├── backend
│   ├── .env.example
│   ├── app.js
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
│   │   │   ├── Clientes
│   │   │   │   └── Clientes.jsx
│   │   │   ├── Home
│   │   │   │   └── Home.jsx
│   │   │   ├── Productos
│   │   │   │   └── Productos.jsx
│   │   │   └── Ventas
│   │   │       └── Ventas.jsx
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

## Dónde reportar errores

https://github.com/axelintu/cafecito-feliz-afp/issues
