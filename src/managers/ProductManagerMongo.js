import Product from '../models/Product.js';

export default class ProductManagerMongo {
  async getProducts() {
    try {
      return await Product.find();
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error('❌ Producto no encontrado:', error);
      return null;
    }
  }

  async addProduct(data) {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (error) {
      console.error('❌ Error al crear producto:', error);
      return null;
    }
  }

  async updateProduct(id, updates) {
    try {
      return await Product.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
      console.error('❌ Error al actualizar producto:', error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error('❌ Error al eliminar producto:', error);
      return null;
    }
  }
}
