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

// Obtener carrito por ID (con productos populados)
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito.' });
  }
});

// Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito.' });
  }
});

// Reemplazar todo el carrito
router.put('/:cid', async (req, res) => {
  try {
    const result = await cartManager.updateCart(req.params.cid, req.body.products);
    if (!result) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito.' });
  }
});

// Actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const result = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    if (!result) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto.' });
  }
});

// Vaciar todo el carrito
router.delete('/:cid', async (req, res) => {
  try {
    const result = await cartManager.clearCart(req.params.cid);
    if (!result) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito.' });
  }
});

export default router;
