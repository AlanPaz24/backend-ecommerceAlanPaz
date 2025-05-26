import Product from '../models/Product.js';

export default class ProductManagerMongo {
  // ✅ Obtener productos con filtros, paginación y ordenamiento
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
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

      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage ?? null,
        nextPage: result.nextPage ?? null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `?page=${result.nextPage}` : null
      };
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      return { status: 'error', message: 'No se pudieron obtener los productos.' };
    }
  }

  // ✅ Obtener un producto por ID
  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error('❌ Producto no encontrado:', error);
      return null;
    }
  }

  // ✅ Crear un nuevo producto
  async addProduct(data) {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      return null;
    }
  }

  // ✅ Actualizar un producto
  async updateProduct(id, updates) {
    try {
      return await Product.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      return null;
    }
  }

  // ✅ Eliminar un producto
  async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      return null;
    }
  }
}
