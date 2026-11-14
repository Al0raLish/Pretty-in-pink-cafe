# Pretty in Pink Café

**Student:** Alisha Javed · **Roll No:** 24I-2063 · **Section:** A
**Course:** CS4032 Web Programming, Assignment 02, Fall 2026

- **GitHub:** https://github.com/Al0raLish/pretty-in-pink-cafe
- **Deployment:** https://YOUR-PROJECT.vercel.app
- **Final commit:** `PASTE-HASH-HERE`

## Description
A frontend-only ordering website for a fictional Barbie-inspired café in Islamabad (F-6 to G-8 delivery area) for students and professionals. Customers browse the menu, search and filter, open item pages, choose sizes and add-ons, build a cart, fill in a checkout form, and reach a confirmation. All data is local and all orders and payments are simulated.

## Commands
```bash
npm install      # install dependencies
npm run dev      # development server
npm run build    # production build
npm test         # automated tests (Node built-in runner)
```

## Routes
| Route | Purpose |
|---|---|
| `/` | Home |
| `/menu` | Menu with search, filters, sort |
| `/menu/:id` | Item details (invalid IDs show feedback) |
| `/cart` | Cart, promo code |
| `/checkout` | Checkout form |
| `/confirmation` | Order confirmation |
| `/about` | About, contact, map |
| `/join` | Pink Club sign-up |

## Features
Search, category/price/dietary/availability filters and sorting; item details with ingredients and allergens; sizes, add-ons, quantity limits; cart with live totals; promo codes; checkout validation; simulated payment (cash on delivery or mock card, no card details collected); localStorage persistence; async mock loader with loading, error and retry; empty states; invalid-route pages.

## Operating rules
1. **Availability:** unavailable or sold-out items can't be ordered; quantity is 1 to 10 (or less if stock is lower).
2. **Compatibility:** only an item's listed sizes and add-ons can be chosen.
3. **Delivery:** free at Rs. 2,000 or more, otherwise Rs. 250.

## Reproducing edge cases
Open "Demonstration controls (for assessment)" at the bottom of any page:
- Tick **Simulate menu loading failure**, then **Try again** to see the retry flow.
- Tick **Simulate an empty menu** to see the empty-dataset state.
- **Mark sold out** with an item in the cart to see the cart re-check.
- Corrupt saved cart: in the console run `localStorage.setItem('pip-cafe-cart-v1','not json')` and refresh.
- Invalid URLs: `/menu/banana` and `/xyz`.

## Simulated operations and limitations
- Orders, payments, Pink Club membership and loyalty points are simulated. No card details, passwords or personal details are stored; only a member yes/no flag, points and the cart are saved.
- Promo and membership checks are client-side and can be bypassed by editing localStorage. A real shop needs server checks.
- Allergen and ingredient data are fictional.
- The map uses OpenStreetMap and needs internet.
- "From" price shows the base price, which isn't the cheapest size for items without a small size.

## Image credits
| File | Source | URL | Licence |
|---|---|---|---|
| (fill in each of your 12 images) | Pinterest | pin URL | per instructor permission |

## Concept map
| Concept | File | Component / function |
|---|---|---|
| Routing, URL params | `src/App.jsx`, `ItemDetailsPage.jsx` | `Routes`, `useParams` |
| Props and callbacks | `MenuFilters.jsx` | `onChange`, `onClear` |
| useState / controlled inputs | `CheckoutPage.jsx` | `values`, `handleChange` |
| Immutable updates | `CartProvider.jsx` | `addToCart`, `removeLine` |
| Functional updates | `CartProvider.jsx` | `setLines((prev) => ...)` |
| Shared state | `CartProvider.jsx`, `MenuProvider.jsx` | Context providers |
| Derived values | `utils/cart.js` | `buildSummary` |
| useEffect and cleanup | `MenuProvider.jsx` | `loadMenu` with `cancelled` flag |
| Async code | `services/menuService.js` | `loadMenu` Promise |
| localStorage | `CartProvider.jsx` | `loadSavedCart`, `save` |
| Validation | `utils/validation.js` | `validateCheckout` |
| Business rules | `rules/businessRules.js` | `checkQuantity`, `checkCustomization`, `getDeliveryFee` |
| Automated test | `tests/businessRules.test.js` | `getDeliveryFee` |
| Lists and keys | `MenuPage.jsx` | `results.map` with `item.id` |
| Conditional rendering | `MenuPage.jsx` | loading / error / empty / no-match |