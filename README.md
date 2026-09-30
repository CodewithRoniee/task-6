# Basin & Bloom

A production-styled e-commerce storefront capstone project — a small houseplant
and botanical goods shop. Built with plain HTML, CSS, and JavaScript (no
framework, no build step) so it deploys to Vercel as a static site with zero
configuration.

**Live demo:** _add your Vercel URL here after deploying_
**Repo:** _add your GitHub URL here_

---

## Features

- **Interactive catalog** — category filter chips, a responsive product grid,
  and a product detail modal with quantity selection.
- **Cart & checkout** — a slide-out cart drawer, a checkout form, and an order
  confirmation page. Cart state persists across page loads via `localStorage`.
- **Simulated authentication** — sign up / log in with an email and password.
  Accounts are stored in the browser (`localStorage`) rather than a real
  backend — this is a front-end capstone, not a production auth system.
- **Admin CRUD panel** (`admin.html`) — add, edit, and delete products, and
  review orders that have been placed. Gated behind the demo admin account.
- **Persistent state** — products, cart, accounts, and order history are all
  kept in `localStorage`, so the shop "remembers" everything between visits
  on the same browser.

### Demo accounts

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| Admin | `admin@basinbloom.test`   | `admin123`|
| Shopper | *(sign up with any email)* | — |

---

## Architecture

Everything runs client-side. There is no server or database — `localStorage`
plays that role for this capstone.

```
Browser
 ├── index.html ─────── storefront: catalog, product modal, cart drawer
 ├── login.html ─────── sign up / log in (simulated auth)
 ├── checkout.html ──── order form → placeOrder()
 ├── order-confirmed.html
 ├── admin.html ─────── product CRUD + order log (admin-only)
 │
 ├── css/styles.css ─── design tokens + all page styles
 │
 └── js/
      ├── data.js ────── seed catalog + getProducts()/saveProducts()
      ├── auth.js ────── signup()/login()/logout(), session helpers
      ├── store.js ───── cart state, cartTotal(), placeOrder()
      ├── icons.js ───── inline SVG illustrations (no image hosting needed)
      ├── catalog.js ─── renders index.html: filters, grid, modal, drawer
      └── admin.js ───── renders admin.html: CRUD table + editor modal
```

**Data flow example — adding to cart:**
`catalog.js` (Add to cart click) → `store.js: addToCart()` → writes to
`localStorage["bb_cart"]` → `updateCartBadge()` re-renders the nav badge →
`renderCartItems()` re-renders the drawer.

**localStorage keys used:**

| Key            | Holds                                    |
|----------------|-------------------------------------------|
| `bb_products`  | The product catalog (seeded once, then editable via admin) |
| `bb_cart`      | Current cart line items                   |
| `bb_users`     | Simulated user accounts                   |
| `bb_session`   | The currently logged-in user, if any      |
| `bb_orders`    | Placed orders (shown in the admin panel)  |

Because state lives in `localStorage`, it's per-browser and won't sync
between devices — that's expected for a front-end-only demo.

---

## Running locally

No build step or dependencies required. Any static file server works:

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node (npx, no install needed)
npx serve .
```

Then open `http://localhost:8080`.

> Opening `index.html` directly via `file://` mostly works too, but some
> browsers restrict `localStorage` on the `file://` protocol — a local
> server avoids that.

---

## Deploying to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Basin & Bloom storefront"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
   - Framework preset: **Other** (it's a static site — no build command needed).
   - Leave the build & output settings blank/default and click **Deploy**.
   - Vercel gives you a live URL (e.g. `your-repo.vercel.app`) once the
     deploy finishes.

   Alternatively, from the CLI:
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. Update the **Live demo** and **Repo** links at the top of this README,
   commit, and push again.

---

## Notes for reviewers

- This is a capstone/demo project: authentication and payment are simulated
  and store no real credentials or payment data anywhere.
- The product illustrations are hand-drawn inline SVGs rather than photos,
  so the site has zero external image dependencies and nothing to break on
  a fresh deploy.
- Fonts (Fraunces, Work Sans) load from Google Fonts; everything else is
  self-contained.
