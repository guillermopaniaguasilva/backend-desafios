const { createServer } = require('http');
const express = require('express');
const hbs = require('hbs');
const socketIO = require('socket.io');
const Container = require('./Container');

const port = process.env.PORT || 8080;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Agregar producto',
  });
});

const server = createServer(app);
const io = socketIO(server);

const products = [
  {
    title: 'Calculadora',
    price: 20,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-1024.png',
  },
  {
    title: 'Escuadra',
    price: 34,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-1024.png',
  },
  {
    title: 'Lápiz',
    price: 25,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-1024.png',
  },
];
const container = new Container('./data/messages/messages.json');

io.sockets.on('connection', async (socket) => {
  console.log('A client has connected.');
  const messages = await container.getAll();

  socket.emit('products', products);

  socket.emit('messages', messages);

  socket.on('newProduct', (data) => {
    products.push(data);
    io.sockets.emit('products', products);
  });

  socket.on('newMessage', async (data) => {
    await container.save(data);
    io.sockets.emit('messages', await container.getAll());
  });
});

server.listen(port, () => {
  console.log(`Server is listenging on port ${port}...`);
});
