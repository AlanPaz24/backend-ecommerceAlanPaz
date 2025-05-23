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
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  // Validar campos obligatorios
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  try {
    const newProduct = await productManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      status: true
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
});

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updates = req.body;

  if (updates.id) {
    return res.status(400).json({ error: 'No se puede actualizar el ID del producto.' });
  }

  try {
    const result = await productManager.updateProduct(pid, updates);
    if (!result) return res.status(404).json({ error: 'Producto no encontrado.' });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

router.delete('/:pid', async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  res.json({ status: 'Producto eliminado' });
});

export default router;
