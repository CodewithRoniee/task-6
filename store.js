// store.js — cart state, persisted to localStorage, plus a tiny
// simulated order log used by checkout.

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("bb_cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("bb_cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const line = cart.find(i => i.productId === productId);
  if (line) {
    line.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  saveCart(cart);
}

function setCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  } else {
    const line = cart.find(i => i.productId === productId);
    if (line) line.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.productId !== productId));
}

function clearCart() {
  saveCart([]);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal(products) {
  const cart = getCart();
  return cart.reduce((sum, i) => {
    const p = products.find(p => p.id === i.productId);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "inline-flex" : "none";
  });
}

function placeOrder(products, customerEmail) {
  const cart = getCart();
  if (cart.length === 0) return { ok: false, error: "Your cart is empty." };
  const order = {
    id: "ord_" + Date.now().toString(36),
    date: new Date().toISOString(),
    email: customerEmail || "guest@basinbloom.test",
    items: cart.map(i => {
      const p = products.find(p => p.id === i.productId);
      return { productId: i.productId, name: p ? p.name : i.productId, qty: i.qty, price: p ? p.price : 0 };
    }),
    total: cartTotal(products)
  };
  const orders = JSON.parse(localStorage.getItem("bb_orders") || "[]");
  orders.push(order);
  localStorage.setItem("bb_orders", JSON.stringify(orders));
  clearCart();
  return { ok: true, order };
}
