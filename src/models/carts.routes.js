import { Router } from 'express';
import CartManager from '../managers/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManager();

// Crear carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(cart);
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
  res.json(result);
});

export default router;
