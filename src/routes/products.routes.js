import { Router } from 'express';
import Product from '../models/Product.js';
import ProductManager from '../managers/ProductManagerMongo.js';

const router = Router();
const productManager = new ProductManager();

// ✅ GET con paginación, filtros y ordenamiento
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? {
          $or: [
            { category: { $regex: query, $options: 'i' } },
            { status: query === 'true' ? true : query === 'false' ? false : undefined }
          ]
        }
      : {};

    const sortOption = sort === 'asc'
      ? { price: 1 }
      : sort === 'desc'
      ? { price: -1 }
      : {};

    const result = await Product.paginate(filter, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true
    });

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ✅ GET por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  product
    ? res.json(product)
    : res.status(404).json({ error: 'Producto no encontrado' });
});

// ✅ POST: Crear producto
router.post('/', async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

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

// ✅ PUT: Actualizar producto
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

// ✅ DELETE
router.delete('/:pid', async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.pid);
    res.json({ status: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

export default router;
