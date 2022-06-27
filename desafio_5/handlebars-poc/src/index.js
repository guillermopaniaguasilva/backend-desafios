const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const productsRoutes = require('./routes/products');

const port = process.env.PORT || 8080;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(productsRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
