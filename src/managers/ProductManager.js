import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const path = 'src/data/products.json';

export default class ProductManager {
  async getProducts() {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = { ...product, id: uuidv4() };
    products.push(newProduct);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields, id: products[index].id };
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    products = products.filter(p => p.id !== id);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
  }
}
