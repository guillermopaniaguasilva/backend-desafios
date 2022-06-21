const express = require('express');
const productsRouter = require('./routes/products');

const app = express();

app.use(productsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
