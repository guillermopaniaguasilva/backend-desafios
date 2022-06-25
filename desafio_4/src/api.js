class API {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    const id = this.products.length + 1;
    this.products.push({ id, ...product });
    return id;
  }

  updateProduct(id, product) {
    this.products = this.products.filter((product) => product.id !== id);
    this.products.push({ id, ...product });
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}

module.exports = API;
