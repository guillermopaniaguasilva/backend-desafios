const socket = io.connect();

function renderProducts(products) {
  const html = `
    <h1 class="ui header">Vista de productos</h1>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  `;
  const productsHtml = products
    .map((product) => {
      return `
      <tr>
        <td data-label="Nombre">${product.title}</td>
        <td data-label="Precio">$${product.price}</td>
        <td data-label="Foto"><img class="ui mini image" src="${product.thumbnail}" /></td>
      </tr>
    `;
    })
    .join(' ');
  document.querySelector('#products').innerHTML = html;
  document.querySelector('tbody').innerHTML = productsHtml;
}

function renderMessages(messages) {
  const html = messages
    .map((message) => {
      return `
        <div>
          <strong class="message-author">${message.author}</strong> <span class="message-timestamp">[${message.timestamp}]</span>: <em class="message-text">${message.text}</em>
        <div>
    `;
    })
    .join(' ');
  document.querySelector('#messages').innerHTML = html;
}

function addProduct() {
  const product = {
    title: document.querySelector('#title').value,
    price: document.querySelector('#price').value,
    thumbnail: document.querySelector('#thumbnail').value,
  };
  socket.emit('newProduct', product);
  return false;
}

function sendMessage() {
  const message = {
    author: document.querySelector('#email').value,
    text: document.querySelector('#message').value,
    timestamp: new Date().toLocaleString(),
  };
  socket.emit('newMessage', message);
  return false;
}

socket.on('products', (products) => {
  renderProducts(products);
});

socket.on('messages', (messages) => {
  renderMessages(messages);
});

$(document).ready(function () {
  $('#add-product form').form({
    fields: {
      title: {
        identifier: 'title',
        rules: [{ type: 'empty', prompt: 'Por favor, ingresá un título' }],
      },
      price: {
        identifier: 'price',
        rules: [{ type: 'empty', prompt: 'Por favor, ingresá un precio' }],
      },
      thumbnail: {
        identifier: 'thumbnail',
        rules: [
          {
            type: 'empty',
            prompt: 'Por favor, ingresá la dirección de una imagen.',
          },
        ],
      },
    },
    onSuccess: function (event) {
      event.preventDefault();
      addProduct(event);
      return false;
    },
  });

  $('#message-center form').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: 'Por favor, ingresá tu email.',
          },
          {
            type: 'email',
            prompt: 'Por favor, ingresá un email válido.',
          },
        ],
      },
    },
    onSuccess: function (event) {
      event.preventDefault();
      sendMessage(event);
      return false;
    },
  });
});
