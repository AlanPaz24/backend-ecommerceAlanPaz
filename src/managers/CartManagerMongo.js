import Cart from '../models/Cart.js';

export default class CartManagerMongo {
  async createCart() {
    try {
      return await Cart.create({});
    } catch (error) {
      console.error('❌ Error al crear carrito:', error);
    }
  }

  async getCartById(cid) {
    try {
      return await Cart.findById(cid).populate('products.product');
    } catch (error) {
      console.error('❌ Carrito no encontrado:', error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('❌ Error al agregar producto al carrito:', error);
    }
  }
}
