# 🏍️ Backend E-commerce de Motos

Este es un proyecto de backend desarrollado con **Node.js** y **Express**, como parte de la preentrega del curso de **Backend en Coderhouse**. Simula el backend de una tienda online de venta de motos.

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- JSON para persistencia de datos (sin base de datos aún)
- Nodemon (en desarrollo)

## 📁 Estructura del proyecto
Método	Endpoint	Descripción
GET	/api/products	Obtener todos los productos
GET	/api/products/:pid	Obtener un producto por su ID
POST	/api/products	Crear un nuevo producto
PUT	/api/products/:pid	Actualizar un producto por su ID
DELETE	/api/products/:pid	Eliminar un producto por su ID
GET	/api/carts	Obtener todos los carritos
GET	/api/carts/:cid	Obtener un carrito por su ID
POST	/api/carts	Crear un nuevo carrito
POST	/api/carts/:cid/product/:pid	Agregar un producto al carrito
DELETE	/api/carts/:cid/product/:pid	Eliminar un producto de un carrito
