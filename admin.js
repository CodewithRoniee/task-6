// admin.js — CRUD for the product catalog, gated behind the
// simulated admin session, plus a read-only view of orders placed
// through checkout.html. All state lives in localStorage.

document.addEventListener("DOMContentLoaded", () => {
  const session = requireAdmin();
  if (!session) return; // requireAdmin() already redirected

  renderNavSession(document.getElementById("navSession"));
  renderTable();
  renderOrders();
  wireEditor();

  document.getElementById("addProductBtn").addEventListener("click", () => openEditor(null));
});

function renderTable() {
  const products = getProducts();
  const body = document.getElementById("adminTableBody");

  if (products.length === 0) {
    body.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--ink-soft);padding:24px;">No products yet. Add your first one.</td></tr>`;
    return;
  }

  body.innerHTML = products.map(p => `
    <tr data-id="${p.id}">
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.category)}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td class="${p.stock <= 5 ? "stock-low" : ""}">${p.stock}</td>
      <td class="admin-actions">
        <button data-action="edit">Edit</button>
        <button data-action="delete" class="danger">Delete</button>
      </td>
    </tr>
  `).join("");

  body.querySelectorAll("tr").forEach(row => {
    const id = row.dataset.id;
    row.querySelector('[data-action="edit"]').addEventListener("click", () => openEditor(id));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => deleteProduct(id));
  });
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("bb_orders") || "[]").slice().reverse();
  const body = document.getElementById("ordersTableBody");
  if (orders.length === 0) {
    body.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--ink-soft);padding:24px;">No orders placed yet.</td></tr>`;
    return;
  }
  body.innerHTML = orders.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${escapeHtml(o.email)}</td>
      <td>${o.items.reduce((s, i) => s + i.qty, 0)} item(s)</td>
      <td>$${o.total.toFixed(2)}</td>
      <td>${new Date(o.date).toLocaleString()}</td>
    </tr>
  `).join("");
}

function openEditor(id) {
  const backdrop = document.getElementById("editorBackdrop");
  const title = document.getElementById("editorTitle");
  document.getElementById("editId").value = id || "";

  if (id) {
    const p = getProducts().find(p => p.id === id);
    title.textContent = "Edit product";
    document.getElementById("editName").value = p.name;
    document.getElementById("editCategory").value = p.category;
    document.getElementById("editPrice").value = p.price;
    document.getElementById("editStock").value = p.stock;
    document.getElementById("editIcon").value = p.icon;
    document.getElementById("editBlurb").value = p.blurb;
    document.getElementById("editDescription").value = p.description;
  } else {
    title.textContent = "Add product";
    document.getElementById("editorForm").reset();
  }
  backdrop.classList.add("open");
}

function closeEditor() {
  document.getElementById("editorBackdrop").classList.remove("open");
}

function wireEditor() {
  document.getElementById("cancelEditBtn").addEventListener("click", closeEditor);
  document.getElementById("editorBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "editorBackdrop") closeEditor();
  });

  document.getElementById("editorForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const products = getProducts();

    const data = {
      name: document.getElementById("editName").value.trim(),
      category: document.getElementById("editCategory").value.trim(),
      price: parseFloat(document.getElementById("editPrice").value),
      stock: parseInt(document.getElementById("editStock").value, 10),
      icon: document.getElementById("editIcon").value,
      blurb: document.getElementById("editBlurb").value.trim(),
      description: document.getElementById("editDescription").value.trim()
    };

    if (id) {
      const idx = products.findIndex(p => p.id === id);
      if (idx > -1) products[idx] = { ...products[idx], ...data };
      showToast("Product updated");
    } else {
      data.id = "p" + Date.now().toString(36);
      products.push(data);
      showToast("Product added");
    }

    saveProducts(products);
    closeEditor();
    renderTable();
  });
}

function deleteProduct(id) {
  const products = getProducts();
  const p = products.find(p => p.id === id);
  if (!p) return;
  if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return;
  saveProducts(products.filter(p => p.id !== id));
  showToast("Product deleted");
  renderTable();
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}
