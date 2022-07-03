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
  const p = products
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
  document.querySelector('tbody').innerHTML = p;
}

function addProduct(e) {
  const product = {
    title: document.querySelector('#title').value,
    price: document.querySelector('#price').value,
    thumbnail: document.querySelector('#thumbnail').value,
  };
  socket.emit('newProduct', product);
  return false;
}

const submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addProduct(e);
});

socket.on('products', (products) => {
  renderProducts(products);
});
