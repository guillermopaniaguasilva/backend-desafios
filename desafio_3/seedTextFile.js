const fs = require('fs');

const products = [
  {
    id: 1,
    title: 'Guitarra',
    price: 250000,
    thumbnail:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
  },
  {
    id: 2,
    title: 'Bajo',
    price: 250000,
    thumbnail:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
  },
  {
    id: 3,
    title: 'Batería',
    price: 250000,
    thumbnail:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
  },
];

(async function () {
  await fs.promises.writeFile('./products.txt', JSON.stringify(products));
})();
