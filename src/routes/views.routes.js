import { Router } from 'express';
import Product from '../models/Product.js';
import CartManager from '../managers/CartManagerMongo.js';
import ProductManager from '../managers/ProductManagerMongo.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

// 👉 Ruta Home (opcional, si querés cargar productos desde archivo)
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

// 👉 Vista con WebSockets (realTimeProducts)
router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// 👉 Vista de productos paginados (desde MongoDB con filtros)
router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const cartId = '6833adcb8a618a7c862b9d1a'; // 🟡 Si querés después lo hacemos dinámico

    const filter = query
      ? { $or: [{ category: query }, { status: query }] }
      : {};

    const sortOption = sort === 'asc'
      ? { price: 1 }
      : sort === 'desc'
      ? { price: -1 }
      : {};

    const result = await Product.paginate(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true
    });

    res.render('products', {
      products: result.docs,
      cartId,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
      }
    });
  } catch (err) {
    res.status(500).send('Error al cargar productos');
  }
});

// 👉 Vista individual de un producto
router.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  if (!product) return res.status(404).send('Producto no encontrado');
  res.render('productDetail', { product });
});

// 👉 Vista del carrito con productos populados
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const total = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.render('cartDetail', { cart, total });
  } catch (err) {
    res.status(500).send('Error al cargar el carrito');
  }
});

export default router;
