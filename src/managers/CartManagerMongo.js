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
  // Este método va dentro de la clase
  async getAllCarts() {
    try {
      return await Cart.find().populate('products.product');
    } catch (error) {
      console.error('❌ Error al obtener carritos:', error);
      return [];
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
    // Eliminar un producto puntual del carrito
  async removeProductFromCart(cid, pid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      cart.products = cart.products.filter(p => p.product.toString() !== pid);
      await cart.save();
      return cart;
    } catch (error) {
      console.error('❌ Error al eliminar producto del carrito:', error);
    }
  }

  // Reemplazar todo el carrito con un array de productos
  async updateCart(cid, newProducts) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      cart.products = newProducts;
      await cart.save();
      return cart;
    } catch (error) {
      console.error('❌ Error al actualizar carrito completo:', error);
    }
  }

  // Actualizar solo la cantidad de un producto
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      const product = cart.products.find(p => p.product.toString() === pid);
      if (!product) return null;

      product.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      console.error('❌ Error al actualizar cantidad:', error);
    }
  }

  // Vaciar el carrito
  async clearCart(cid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      console.error('❌ Error al vaciar carrito:', error);
    }
  }
}
