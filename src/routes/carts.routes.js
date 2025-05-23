import { Router } from 'express';
import CartManager from '../managers/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManager();

// Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});
// Crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// Obtener carrito por ID (con productos populados)
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
// 1. DELETE un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.removeProductFromCart(cid, pid);
  if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
  res.json(result);
});

// 2. PUT reemplazar todo el carrito
router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  const result = await cartManager.updateCart(cid, products);
  if (!result) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(result);
});

// 3. PUT actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const result = await cartManager.updateProductQuantity(cid, pid, quantity);
  if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
  res.json(result);
});

// 4. DELETE vaciar todo el carrito
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  const result = await cartManager.clearCart(cid);
  if (!result) return res.status(404).json({ error: 'Carrito no encontrado' });
  res.json(result);
});


export default router;
