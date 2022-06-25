const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api/products', productsRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
