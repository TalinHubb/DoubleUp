let selectedCategory = "All";
let selectedStore = storeLocations.find(store => store.id === localStorage.getItem("doubleup-store")) || storeLocations[0];
let cart = JSON.parse(localStorage.getItem("doubleup-demo-cart") || "[]");
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function renderCategories() {
  $("#category-tabs").innerHTML = categories.map(category => `<button class="category-tab ${category === selectedCategory ? "active" : ""}" role="tab" aria-selected="${category === selectedCategory}" data-category="${category}">${category}</button>`).join("");
}
function renderProducts() {
  const query = $("#product-search").value.trim().toLowerCase();
  const matches = productCatalog.filter(product => (selectedCategory === "All" || product.category === selectedCategory) && (!query || `${product.name} ${product.category}`.toLowerCase().includes(query)));
  $("#product-grid").innerHTML = matches.map(product => {
    const low = selectedStore.lowStock.includes(product.id);
    return `<article class="product-card"><div class="product-visual"><img src="${product.image}" alt="${product.name}" loading="lazy">${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}</div><div class="product-info"><p class="stock ${low ? "low" : ""}">● ${low ? "Low stock" : "In stock"}</p><h3>${product.name}</h3><div class="product-meta"><strong>${money(product.price)}</strong><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button></div></div></article>`;
  }).join("");
  $("#empty-products").hidden = matches.length > 0;
}
function renderLocations() {
  $("#locations-grid").innerHTML = storeLocations.map(store => `<article class="location-card ${store.id === selectedStore.id ? "selected" : ""}"><span class="number">${store.number}</span><h3>${store.name}</h3><p>${store.address}<br>${store.city}</p><p>${store.phone}</p><p class="hours">● ${store.hours}</p><div class="location-links"><button data-store="${store.id}">${store.id === selectedStore.id ? "Shopping here" : "Shop this store"}</button><a href="https://maps.google.com/?q=${encodeURIComponent(store.address + " " + store.city)}" target="_blank" rel="noreferrer">Directions ↗</a></div></article>`).join("");
  $("#location-options").innerHTML = storeLocations.map(store => `<button class="location-option ${store.id === selectedStore.id ? "active" : ""}" data-store="${store.id}"><strong>${store.name}</strong><small>${store.address} · ${store.hours.replace("Open today · ", "")}</small></button>`).join("");
}
function selectStore(id) {
  selectedStore = storeLocations.find(store => store.id === id) || storeLocations[0];
  localStorage.setItem("doubleup-store", selectedStore.id);
  ["#header-location", "#shop-location", "#cart-location"].forEach(selector => $(selector).textContent = selectedStore.name);
  renderProducts(); renderLocations(); closeLocation(); showToast(`Now shopping ${selectedStore.name}`);
}
function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  $("#cart-count").textContent = count; $("#cart-empty").hidden = count > 0; $("#cart-summary").hidden = count === 0;
  $("#cart-items").innerHTML = cart.map(item => { const product = productCatalog.find(entry => entry.id === item.id); return `<div class="cart-item"><img class="cart-thumb" src="${product.image}" alt=""><div><h4>${product.name}</h4><p>${money(product.price)}</p></div><div class="qty-control"><button data-qty="-1" data-id="${item.id}" aria-label="Remove one">−</button><b>${item.quantity}</b><button data-qty="1" data-id="${item.id}" aria-label="Add one">+</button></div></div>`; }).join("");
  const total = cart.reduce((sum, item) => sum + productCatalog.find(product => product.id === item.id).price * item.quantity, 0);
  $("#cart-total").textContent = money(total); localStorage.setItem("doubleup-demo-cart", JSON.stringify(cart));
}
function addToCart(id) { const existing = cart.find(item => item.id === id); existing ? existing.quantity++ : cart.push({ id, quantity: 1 }); renderCart(); showToast("Added to your pickup bag"); }
function updateQuantity(id, amount) { const item = cart.find(entry => entry.id === id); if (!item) return; item.quantity += amount; cart = cart.filter(entry => entry.quantity > 0); renderCart(); }
function openCart() { $("#cart-drawer").classList.add("open"); $("#cart-drawer").setAttribute("aria-hidden", "false"); $("#overlay").hidden = false; document.body.classList.add("locked"); }
function closeCart() { $("#cart-drawer").classList.remove("open"); $("#cart-drawer").setAttribute("aria-hidden", "true"); $("#overlay").hidden = true; document.body.classList.remove("locked"); }
function openLocation() { $("#location-modal").hidden = false; document.body.classList.add("locked"); }
function closeLocation() { $("#location-modal").hidden = true; document.body.classList.remove("locked"); }
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2300); }

document.addEventListener("click", event => {
  const category = event.target.closest("[data-category]"); const add = event.target.closest("[data-add]"); const store = event.target.closest("[data-store]"); const qty = event.target.closest("[data-qty]");
  if (category) { selectedCategory = category.dataset.category; renderCategories(); renderProducts(); }
  if (add) addToCart(Number(add.dataset.add)); if (store) selectStore(store.dataset.store); if (qty) updateQuantity(Number(qty.dataset.id), Number(qty.dataset.qty));
});
$("#product-search").addEventListener("input", renderProducts); $("#cart-button").addEventListener("click", openCart); $$('.close-drawer').forEach(button => button.addEventListener("click", closeCart)); $("#overlay").addEventListener("click", closeCart); $("#location-button").addEventListener("click", openLocation); $$('.change-location').forEach(button => button.addEventListener("click", openLocation)); $(".close-location").addEventListener("click", closeLocation); $("#location-modal").addEventListener("click", event => { if (event.target === $("#location-modal")) closeLocation(); });
$("#pickup-button").addEventListener("click", () => { closeCart(); showToast("Demo pickup request ready — nothing was submitted"); });
$("#manager-demo").addEventListener("click", () => showToast("Manager dashboard shown in the preview panel"));
$("#rewards-form").addEventListener("submit", event => { event.preventDefault(); const phone = $("#rewards-phone").value.replace(/\D/g, ""); if (phone.length < 10) { showToast("Enter a 10-digit sample number"); return; } $("#reward-result").hidden = false; $("#rewards-phone").value = ""; });
$("#age-confirm").addEventListener("click", () => { sessionStorage.setItem("doubleup-age-confirmed", "yes"); $("#age-modal").hidden = true; document.body.classList.remove("locked"); });
$("#age-exit").addEventListener("click", () => { document.body.innerHTML = '<main class="age-card" style="margin:12vh auto"><span class="age-logo">DU</span><h2>Thanks for stopping by.</h2><p>This concept storefront is limited to adults 21 and older.</p></main>'; });
document.addEventListener("keydown", event => { if (event.key === "Escape") { closeCart(); closeLocation(); } });
$("#year").textContent = new Date().getFullYear();
selectStore(selectedStore.id); renderCategories(); renderCart();
if (!sessionStorage.getItem("doubleup-age-confirmed")) { $("#age-modal").hidden = false; document.body.classList.add("locked"); }

