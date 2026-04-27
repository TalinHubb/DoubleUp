let cart = [];

function toggleCart() {
  const cartEl = document.getElementById("cart");
  const overlay = document.getElementById("overlay");

  cartEl.classList.toggle("open");
  overlay.classList.toggle("show");
}

window.toggleCart = toggleCart;

function filterCategory(category) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  const categoryProducts = products[category];

  if (!categoryProducts) {
    console.warn("Category not found:", category);
    return;
  }

  categoryProducts.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${category}', ${i})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(category, index) {
  const product = products[category][index];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const total = document.getElementById("total");

  list.innerHTML = "";
  let sum = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <br>
      <button onclick="increaseQty(${i})">+</button>
      <button onclick="decreaseQty(${i})">-</button>
    `;

    list.appendChild(li);

    sum += item.price * item.quantity;
  });

  total.textContent = sum;
}

function increaseQty(index) {
  cart[index].quantity++;
  renderCart();
}

function decreaseQty(index) {
  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function checkout() {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Please enter phone number for loyalty points.");
    return;
  }

  alert("Order placed! Ready for pickup.");
  cart = [];
  renderCart();
}

window.addEventListener("DOMContentLoaded", () => {
  filterCategory('flower');
});
window.filterCategory = filterCategory;
window.addToCart = addToCart;
window.checkout = checkout;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;