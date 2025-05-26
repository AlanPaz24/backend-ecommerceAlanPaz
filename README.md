# 🛒 Backend Ecommerce - Proyecto Final

Este es mi proyecto final del curso de Backend en Coderhouse. Se trata de un backend para un ecommerce de motos, desarrollado con Express, MongoDB y Handlebars.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Socket.io (Websockets)
- Handlebars (motor de plantillas)
- Bootstrap (en views)
- JavaScript moderno (ES Modules)
- dotenv

---

## 📦 Funcionalidades principales

### 🧾 Productos (`/api/products`)
- Listar productos con filtros, paginación y ordenamiento (`limit`, `page`, `query`, `sort`)
- Crear, actualizar y eliminar productos
- Obtener un producto por ID

### 🛒 Carritos (`/api/carts`)
- Crear un carrito nuevo
- Agregar productos al carrito
- Ver un carrito y sus productos con `populate`
- Actualizar cantidad de productos en el carrito
- Eliminar un producto del carrito
- Vaciar el carrito completo

---

## 👀 Vistas con Handlebars

### `/products`
Muestra todos los productos con paginación. Cada producto tiene botón para agregar al carrito.

### `/products/:pid`
Vista individual de un producto.

### `/carts/:cid`
Muestra el contenido del carrito, total y botones para eliminar productos o vaciarlo.

### `/realtimeproducts`
Vista con Websockets. Cuando se agrega o elimina un producto desde esa vista, se actualiza automáticamente sin recargar la página.

---

## ⚙️ Instrucciones para correr el proyecto

1. Clonar el repositorio:
git clone https://github.com/AlanPaz24/backend-ecommerceAlanPaz
2. Instalar dependencias:
npm install
3. Crear archivo `.env` en la raíz con la variable:
MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/ecommerce
4. Ejecutar el proyecto:
## 🧠 Autor

Alan Paz - Coderhouse Backend - Comisión 75290 🟢

---