// catalog.js — powers index.html: filter chips, product grid,
// the product detail modal, and the cart drawer.

let activeCategory = "All";
let currentProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  renderNavSession(document.getElementById("navSession"));
  updateCartBadge();
  renderFilters();
  renderGrid();
  wireModal();
  wireCartDrawer();
});

function renderFilters() {
  const products = getProducts();
  const categories = ["All", ...new Set(products.map(p => p.category))];
  const row = document.getElementById("filterRow");
  row.innerHTML = categories.map(cat =>
    `<button class="chip ${cat === activeCategory ? "active" : ""}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
  ).join("");
  row.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

function renderGrid() {
  const products = getProducts();
  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  const grid = document.getElementById("catalogGrid");

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;color:var(--ink-soft);">Nothing here yet — check back soon.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="card" data-id="${p.id}">
      <div class="card-art" data-action="open">${productIcon(p.icon)}</div>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(p.category)}</div>
        <div class="card-name" data-action="open">${escapeHtml(p.name)}</div>
        <div class="card-blurb">${escapeHtml(p.blurb)}</div>
        <div class="card-footer">
          <span class="card-price">$${p.price.toFixed(2)}</span>
          ${p.stock <= 5 ? `<span class="card-stock-low">Only ${p.stock} left</span>` : ""}
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".card").forEach(card => {
    const id = card.dataset.id;
    card.querySelectorAll('[data-action="open"]').forEach(el => {
      el.addEventListener("click", () => openProductModal(id));
    });
  });
}

function openProductModal(id) {
  const products = getProducts();
  const p = products.find(p => p.id === id);
  if (!p) return;
  currentProduct = p;

  document.getElementById("modalArt").innerHTML = productIcon(p.icon);
  document.getElementById("modalCat").textContent = p.category;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.description;
  document.getElementById("modalPrice").textContent = `$${p.price.toFixed(2)}`;
  document.getElementById("modalStock").textContent = p.stock > 0 ? `${p.stock} in stock` : "Out of stock";
  document.getElementById("qtyInput").value = "1";

  const addBtn = document.getElementById("modalAddBtn");
  addBtn.disabled = p.stock <= 0;
  addBtn.textContent = p.stock <= 0 ? "Out of stock" : "Add to cart";

  document.getElementById("productModalBackdrop").classList.add("open");
}

function wireModal() {
  const backdrop = document.getElementById("productModalBackdrop");
  document.getElementById("modalCloseBtn").addEventListener("click", () => backdrop.classList.remove("open"));
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) backdrop.classList.remove("open"); });

  document.getElementById("qtyDown").addEventListener("click", () => stepQty(-1));
  document.getElementById("qtyUp").addEventListener("click", () => stepQty(1));

  document.getElementById("modalAddBtn").addEventListener("click", () => {
    if (!currentProduct) return;
    const qty = Math.max(1, parseInt(document.getElementById("qtyInput").value, 10) || 1);
    addToCart(currentProduct.id, qty);
    backdrop_close();
    showToast(`Added ${currentProduct.name} to your cart`);
    renderCartItems();
    openCartDrawer();
  });
}

function backdrop_close() {
  document.getElementById("productModalBackdrop").classList.remove("open");
}

function stepQty(delta) {
  const input = document.getElementById("qtyInput");
  let val = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
  input.value = val;
}

function wireCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  document.getElementById("cartToggle").addEventListener("click", openCartDrawer);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCartDrawer);
  backdrop.addEventListener("click", closeCartDrawer);
  renderCartItems();
}

function openCartDrawer() {
  renderCartItems();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartBackdrop").classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartBackdrop").classList.remove("open");
}

function renderCartItems() {
  const products = getProducts();
  const cart = getCart();
  const container = document.getElementById("cartItems");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty">Your cart is empty. Go find something that won't die on you.</div>`;
    if (checkoutBtn) { checkoutBtn.setAttribute("aria-disabled", "true"); checkoutBtn.style.opacity = "0.5"; checkoutBtn.style.pointerEvents = "none"; }
  } else {
    container.innerHTML = cart.map(line => {
      const p = products.find(p => p.id === line.productId);
      if (!p) return "";
      return `
        <div class="cart-line" data-id="${p.id}">
          <div class="cart-line-art">${productIcon(p.icon)}</div>
          <div class="cart-line-info">
            <div class="cart-line-name">${escapeHtml(p.name)}</div>
            <div class="cart-line-price">$${p.price.toFixed(2)} × ${line.qty}</div>
            <div class="qty-control" style="width:fit-content;">
              <button data-action="dec">−</button>
              <input type="text" value="${line.qty}" readonly style="width:28px;">
              <button data-action="inc">+</button>
            </div>
          </div>
          <button class="cart-line-remove" data-action="remove">Remove</button>
        </div>
      `;
    }).join("");
    if (checkoutBtn) { checkoutBtn.removeAttribute("aria-disabled"); checkoutBtn.style.opacity = "1"; checkoutBtn.style.pointerEvents = "auto"; }

    container.querySelectorAll(".cart-line").forEach(line => {
      const id = line.dataset.id;
      const currentLine = cart.find(c => c.productId === id);
      line.querySelector('[data-action="inc"]').addEventListener("click", () => {
        setCartQty(id, currentLine.qty + 1);
        renderCartItems();
      });
      line.querySelector('[data-action="dec"]').addEventListener("click", () => {
        setCartQty(id, currentLine.qty - 1);
        renderCartItems();
      });
      line.querySelector('[data-action="remove"]').addEventListener("click", () => {
        removeFromCart(id);
        renderCartItems();
      });
    });
  }

  document.getElementById("cartTotal").textContent = `$${cartTotal(products).toFixed(2)}`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}
