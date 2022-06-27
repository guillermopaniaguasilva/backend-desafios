class API {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const id = this.products.length + 1;
    this.products.push({ id, ...product });
    return id;
  }
}

module.exports = API;
