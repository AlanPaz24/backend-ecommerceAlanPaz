const socket = io();
const form = document.getElementById('productForm');
const productList = document.getElementById('productList');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const newProduct = {
    title: data.get('title'),
    price: Number(data.get('price'))
  };
  socket.emit('new-product', newProduct);
  form.reset();
});

function deleteProduct(id) {
  socket.emit('delete-product', id);
}

socket.on('product-list', (products) => {
  productList.innerHTML = '';
  products.forEach(prod => {
    const li = document.createElement('li');
    li.innerHTML = `${prod.title} - $${prod.price} <button onclick="deleteProduct('${prod.id}')">Eliminar</button>`;
    productList.appendChild(li);
  });
});
