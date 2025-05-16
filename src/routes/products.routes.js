import { Router } from 'express';
import ProductManager from '../managers/ProductManagerMongo.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await manager.getProductById(req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const newProduct = await manager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const updated = await manager.updateProduct(req.params.pid, req.body);
  updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.delete('/:pid', async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  res.json({ status: 'Producto eliminado' });
});

export default router;
