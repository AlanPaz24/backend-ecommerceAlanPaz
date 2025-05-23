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

const socket = io();

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const product = {
    title: formData.get('title'),
    description: formData.get('description'),
    code: formData.get('code'),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    category: formData.get('category'),
    thumbnails: formData.get('thumbnails').split(',').map(str => str.trim())
  };

  socket.emit('new-product', product);
  form.reset();
});

function deleteProduct(id) {
  socket.emit('delete-product', id);
}

socket.on('product-list', products => {
  productList.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.title}</strong> - $${p.price} 
      <button onclick="deleteProduct('${p._id}')">Eliminar</button>`;
    productList.appendChild(li);
  });
});

});
