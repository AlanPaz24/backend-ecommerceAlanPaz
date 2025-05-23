import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import ProductManager from './managers/ProductManagerMongo.js';
import { connectDB } from './config/db.js';

// ✅ Conectar a MongoDB
connectDB();

// ✅ Inicializar Express
const app = express();
const PORT = 8080;

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Configuración de Handlebars con acceso a prototipos
app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ✅ Registrar helper 'multiply'
Handlebars.registerHelper('multiply', (a, b) => a * b);

// ✅ Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// ✅ Iniciar servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// ✅ WebSocket con Socket.io
const io = new Server(httpServer);
const productManager = new ProductManager();

io.on('connection', async (socket) => {
  console.log('🟢 Nuevo cliente conectado via WebSocket');

  const products = await productManager.getProducts();
  socket.emit('product-list', products);

  socket.on('new-product', async (data) => {
    await productManager.addProduct(data);
    io.emit('product-list', await productManager.getProducts());
  });

  socket.on('delete-product', async (id) => {
    await productManager.deleteProduct(id);
    io.emit('product-list', await productManager.getProducts());
  });
});
