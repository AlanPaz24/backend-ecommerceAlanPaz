import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './views.router.js';
import { Server } from 'socket.io';
import ProductManager from './managers/ProductManager.js';
import { connectDB } from './config/db.js';
connectDB();


const app = express();
const PORT = 8080;
const productManager = new ProductManager();

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// WebSocket
const io = new Server(httpServer);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSockets
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

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
