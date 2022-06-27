const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const port = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
