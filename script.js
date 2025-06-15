// Product data (can be expanded or loaded via API in future)
const products = [
  { id: 1, name: "UltraBook Pro", price: 999, image: "https://via.placeholder.com/200x150?text=Laptop" },
  { id: 2, name: "SmartPhone X", price: 699, image: "https://via.placeholder.com/200x150?text=Phone" },
  { id: 3, name: "Noise-Canceling Headphones", price: 199, image: "https://via.placeholder.com/200x150?text=Headphones" },
  { id: 4, name: "4K Monitor", price: 299, image: "https://via.placeholder.com/200x150?text=Monitor" }
];

// Load cart count from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Render products
const grid = document.getElementById("product-grid");
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button data-id="${product.id}">Add to Cart</button>
  `;
  grid.appendChild(div);
});

// Handle cart actions
grid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = +e.target.dataset.id;
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    e.target.textContent = "Added!";
    e.target.disabled = true;
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
      e.target.disabled = false;
    }, 1500);
  }
});

// Update cart display
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}
