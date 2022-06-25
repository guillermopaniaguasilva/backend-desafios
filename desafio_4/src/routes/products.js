const express = require('express');
const API = require('../api');

const router = express.Router();
const api = new API();

router.get('/', (req, res) => {
  const products = api.getProducts();
  res.send(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = api.getProductById(Number(id));
  if (!result) {
    return res.status(404).send({ error: 'Product not found.' });
  }
  res.send(result);
});

router.post('/', (req, res) => {
  const { title, price, thumbnail } = req.body;
  const product = { title, price: Number(price), thumbnail };
  const id = api.addProduct(product);
  res.send({ id, ...product });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const newProduct = { title, price, thumbnail };
  api.updateProduct(Number(id), newProduct);
  res.send({ id: Number(id), ...newProduct });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  api.deleteProduct(Number(id));
  res.send({});
});

module.exports = router;
