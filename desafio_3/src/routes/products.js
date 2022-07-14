const express = require('express');
const Container = require('../Container');

const router = express.Router();
const container = new Container('./products.txt');

router.get('/products', async (req, res) => {
  try {
    const products = await container.getAll();
    return res.send(products);
  } catch (error) {
    return res.send('An error occurred.');
  }
});

router.get('/randomProduct', async (req, res) => {
  try {
    const products = await container.getAll();
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return res.send(randomProduct);
  } catch (error) {
    return res.send('An error occurred.');
  }
});

module.exports = router;
