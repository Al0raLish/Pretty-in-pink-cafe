# Frontend Decisions

## Decision 1: Show the price build-up before and during selection (information hierarchy)

- **Problem:** Emen Caffe lists some items with a price and the note "Sold by Weight - as per 10gm", and shows the same item name at two prices in different sections, so the total cost is unclear.
- **Decision:** Item pages show a "From" price, each size's extra cost, each add-on's price, and a live "This selection" total. The cart shows price each and line total, and the summary shows items, promo, delivery and total.
- **Alternative:** Show only a base price and reveal totals at checkout.
- **Reason:** Customers can see what they will pay while choosing, which supports finishing an order.
- **Tradeoff:** More text on the item page and more code to keep prices consistent. Items without a small size show the base price as "From", not the cheapest size.
- **Code location:** `src/components/AddToCartPanel.jsx`, `getUnitPrice()` and `buildSummary()` in `src/utils/cart.js`, `src/components/OrderSummary.jsx`.
- **Evidence:** Screenshot: item page with Large size and add-ons selected showing the live total. Steps: open Rose Petal Latte, choose Large, tick Oat milk, set quantity 2, read "This selection".

## Decision 2: Keep search and filters in the URL (interaction and state)

- **Problem:** Emen Caffe's menu is one long page with category tabs but no visible search or price sort and no way to select items.
- **Decision:** Search, category, price, dietary, availability and sort are stored in the URL with `useSearchParams`. Going to an item and pressing "Back to menu" or the browser Back button restores them. Cards show "In your cart: n".
- **Alternative:** Keep filters in `useState` inside `MenuPage`, which is simpler but resets when the user leaves the page.
- **Reason:** Customers compare items across several pages without losing their place.
- **Tradeoff:** URL values are strings that must be parsed and validated, and the code is longer than plain state.
- **Code location:** `src/pages/MenuPage.jsx` (`handleChange`), `src/utils/filterItems.js` (`filterAndSortItems`), `src/components/MenuFilters.jsx`.
- **Evidence:** Screenshot: filtered menu with the URL visible, then the same filters after returning from an item. Steps: choose Coffee and sort by price, open an item, click "Back to menu".

## Decision 3: Use wrapping controls, not a horizontal tab bar (mobile layout)

- **Problem:** Nando's category bar is cut off at the right edge ("De…") on desktop.
- **Decision:** Categories are a labelled dropdown in a responsive grid (`auto-fit`), and Home shows category chips that wrap onto new lines. Nothing needs sideways scrolling.
- **Alternative:** Keep a scrollable tab bar with arrows or a fade at the edge.
- **Reason:** Every category stays reachable on a 390 px phone, with large touch targets.
- **Tradeoff:** A dropdown hides the list until opened, so choosing a category takes two taps.
- **Code location:** `src/components/MenuFilters.jsx`, `.filters` and `.chip-list` in `src/styles/main.css`, category chips in `src/pages/HomePage.jsx`.
- **Evidence:** Screenshots at 390 px and 1280 px of the menu filters with no horizontal scrollbar. Steps: open `/menu` with the device toolbar at 390 px, open the Category dropdown.