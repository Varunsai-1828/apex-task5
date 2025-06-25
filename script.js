// Cart state
let cart = [];

// Product data (using placeholder images and realistic product names)
const products = [
  { id: 1, name: "iPhone 14 Pro", price: 99999, image: "https://m.media-amazon.com/images/I/61nzPMNY8zL._SL1500_.jpg" },
  { id: 2, name: "Samsung Galaxy S23", price: 74999, image: "https://m.media-amazon.com/images/I/61RZDb2mQxL._SL1500_.jpg" },
  { id: 3, name: "OnePlus 11R", price: 39999, image: "https://m.media-amazon.com/images/I/61uaJPLIdML._SL1500_.jpg" },
  { id: 4, name: "Redmi Note 12 Pro", price: 21999, image: "https://m.media-amazon.com/images/I/81i1t42AGcL._SL1500_.jpg" },
  { id: 5, name: "MacBook Air M2", price: 99990, image: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg" },
  { id: 6, name: "HP Pavilion Laptop", price: 54999, image: "https://m.media-amazon.com/images/I/81pezrPSgOL._SL1500_.jpg" },
  { id: 7, name: "Dell Inspiron 15", price: 58999, image: "https://m.media-amazon.com/images/I/71w4sIP+4kL._SL1500_.jpg" },
  { id: 8, name: "Lenovo IdeaPad Slim", price: 43999, image: "https://m.media-amazon.com/images/I/61Dw5Z8LzJL._SL1500_.jpg" },
  { id: 9, name: "Sony WH-1000XM4", price: 23999, image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg" },
  { id: 10, name: "JBL Tune 510BT", price: 3499, image: "https://m.media-amazon.com/images/I/61D4Z3yKPAL._SL1500_.jpg" },
  { id: 11, name: "Apple Watch Series 8", price: 44999, image: "https://m.media-amazon.com/images/I/71GEg8k7cCL._SL1500_.jpg" },
  { id: 12, name: "Samsung Galaxy Watch 5", price: 24999, image: "https://m.media-amazon.com/images/I/71ZP-2gziLL._SL1500_.jpg" },
  { id: 13, name: "Canon EOS R50", price: 69999, image: "https://m.media-amazon.com/images/I/81e1jU1N38L._SL1500_.jpg" },
  { id: 14, name: "Nikon D3500", price: 34999, image: "https://m.media-amazon.com/images/I/71zV1FA2H7L._SL1500_.jpg" },
  { id: 15, name: "Sony A7 III", price: 174999, image: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._SL1500_.jpg" },
  { id: 16, name: "LG 55-inch Smart TV", price: 45999, image: "https://m.media-amazon.com/images/I/91D+z9wKfGL._SL1500_.jpg" },
  { id: 17, name: "Samsung 50-inch Crystal TV", price: 41999, image: "https://m.media-amazon.com/images/I/91QyN5nOYzL._SL1500_.jpg" },
  { id: 18, name: "Amazon Echo Dot", price: 4999, image: "https://m.media-amazon.com/images/I/61EXU8BuGZL._SL1500_.jpg" },
  { id: 19, name: "Google Nest Mini", price: 3999, image: "https://m.media-amazon.com/images/I/71ZWM9U1ggL._SL1500_.jpg" },
  { id: 20, name: "OnePlus Buds Z2", price: 3999, image: "https://m.media-amazon.com/images/I/61TnX0PmqES._SL1500_.jpg" }
];

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('data-target');
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(target).classList.add('active');
  });
});

// Render products
function renderProducts() {
  const productsGrid = document.getElementById('products-grid');
  productsGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200'">
      <h3>${product.name}</h3>
      <p>₹${product.price.toLocaleString('en-IN')}</p>
      <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    </div>
  `).join('');
}

// Add to cart
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart')) {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-name');
    const price = parseInt(e.target.getAttribute('data-price'));
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
  }
});

// Remove from cart
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item')) {
    const id = e.target.getAttribute('data-id');
    cart = cart.filter(item => item.id !== id);
    updateCart();
  }
});

// Clear cart
document.getElementById('clear-cart').addEventListener('click', function() {
  cart = [];
  updateCart();
});

// Update cart UI
function updateCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.name} (₹${item.price.toLocaleString('en-IN')}) x ${item.quantity}</span>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    </div>
  `).join('');
}

// Initialize
document.getElementById('home').classList.add('active');
renderProducts();
updateCart();
