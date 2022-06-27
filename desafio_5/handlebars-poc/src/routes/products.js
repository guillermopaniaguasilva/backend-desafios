const express = require('express');
const API = require('../api');

const router = express.Router();
const api = new API();

router.get('/', (req, res) => {
  res.render('add-product', {
    active: { addProduct: true },
    title: 'Agregar producto',
  });
});

router.get('/products', (req, res) => {
  const products = api.getProducts();
  res.render('list-products', {
    products,
    active: { products: true },
    title: 'Productos',
  });
});

router.post('/products', (req, res) => {
  const { title, price, thumbnail } = req.body;
  const product = { title, price: Number(price), thumbnail };
  api.addProduct(product);
  res.redirect('/');
});

module.exports = router;
