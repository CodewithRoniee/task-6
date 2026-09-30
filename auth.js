// auth.js — simulated authentication. No server: accounts are
// stored (plaintext, for demo purposes only) in localStorage.
// A real deployment would replace this with a proper auth backend.

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("bb_users")) || [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("bb_users", JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("bb_session")) || null;
  } catch (e) {
    return null;
  }
}

function setSession(user) {
  if (user) {
    localStorage.setItem("bb_session", JSON.stringify({ email: user.email, name: user.name, isAdmin: !!user.isAdmin }));
  } else {
    localStorage.removeItem("bb_session");
  }
}

function signup(name, email, password) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with that email already exists." };
  }
  const isAdmin = email.toLowerCase() === "admin@basinbloom.test";
  const user = { name, email, password, isAdmin };
  users.push(user);
  saveUsers(users);
  setSession(user);
  return { ok: true, user };
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return { ok: false, error: "Email or password is incorrect." };
  }
  setSession(user);
  return { ok: true, user };
}

function logout() {
  setSession(null);
}

function seedAdminIfNeeded() {
  const users = getUsers();
  if (!users.some(u => u.email === "admin@basinbloom.test")) {
    users.push({ name: "Shop Admin", email: "admin@basinbloom.test", password: "admin123", isAdmin: true });
    saveUsers(users);
  }
}

function requireAdmin() {
  seedAdminIfNeeded();
  const session = getSession();
  if (!session || !session.isAdmin) {
    window.location.href = "login.html?next=admin.html";
    return null;
  }
  return session;
}

function renderNavSession(el) {
  const session = getSession();
  if (!el) return;
  if (session) {
    el.innerHTML = `
      <span class="nav-greeting">Hi, ${escapeHtml(session.name.split(" ")[0])}</span>
      <button class="nav-link nav-link--btn" id="logoutBtn">Log out</button>
    `;
    const btn = el.querySelector("#logoutBtn");
    if (btn) btn.addEventListener("click", () => { logout(); window.location.reload(); });
  } else {
    el.innerHTML = `<a class="nav-link" href="login.html">Log in</a>`;
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
