// src/data/menuItems.js
// All data is fictional. Prices are in Pakistani Rupees (Rs.).

export const CATEGORIES = ['Coffee', 'Refreshers', 'Desserts', 'Bakery', 'Light Meals'];

// Sizes: "extra" is added to the base price.
export const SIZES = [
  { id: 'small', label: 'Small', extra: 0 },
  { id: 'medium', label: 'Medium', extra: 60 },
  { id: 'large', label: 'Large', extra: 120 },
];

// Every add-on that exists in the café. Each item lists which ones it allows.
export const ADD_ONS = [
  { id: 'oat-milk', label: 'Oat milk', price: 80 },
  { id: 'extra-shot', label: 'Extra espresso shot', price: 100 },
  { id: 'vanilla-syrup', label: 'Vanilla syrup', price: 50 },
  { id: 'rose-syrup', label: 'Rose syrup', price: 60 },
  { id: 'whipped-cream', label: 'Whipped cream', price: 70 },
  { id: 'extra-cheese', label: 'Extra cheese', price: 90 },
  { id: 'side-salad', label: 'Side salad', price: 150 },
];

export const menuItems = [
  {
    id: 'rose-petal-latte', name: 'Rose Petal Latte', category: 'Coffee', price: 520,
    description: 'Espresso with steamed milk and a delicate rose infusion.',
    image: '/images/rose-petal-latte.jpg', available: true, stock: 20,
    sizes: ['small', 'medium', 'large'],
    addOns: ['oat-milk', 'extra-shot', 'vanilla-syrup', 'rose-syrup', 'whipped-cream'],
  },
  {
    id: 'honey-cardamom-cappuccino', name: 'Honey Cardamom Cappuccino', category: 'Coffee', price: 480,
    description: 'Classic cappuccino sweetened with local honey and cardamom.',
    image: '/images/honey-cappuccino.jpg', available: true, stock: 20,
    sizes: ['small', 'medium', 'large'],
    addOns: ['oat-milk', 'extra-shot', 'vanilla-syrup'],
  },
  {
    id: 'vanilla-cold-brew', name: 'Iced Vanilla Cold Brew', category: 'Coffee', price: 450,
    description: 'Slow-steeped cold brew over ice with a hint of vanilla.',
    image: '/images/vanilla-cold-brew.jpg', available: true, stock: 15,
    sizes: ['medium', 'large'],
    addOns: ['oat-milk', 'extra-shot', 'vanilla-syrup', 'whipped-cream'],
  },
  {
    id: 'strawberry-blush-lemonade', name: 'Strawberry Blush Lemonade', category: 'Refreshers', price: 420,
    description: 'Fresh strawberries, lemon, and sparkling water.',
    image: '/images/strawberry-lemonade.jpg', available: true, stock: 25,
    sizes: ['small', 'medium', 'large'],
    addOns: ['rose-syrup'],
  },
  {
    id: 'peach-hibiscus-cooler', name: 'Peach Hibiscus Cooler', category: 'Refreshers', price: 440,
    description: 'Iced hibiscus tea with peach and a touch of mint.',
    image: '/images/peach-cooler.jpg', available: true, stock: 18,
    sizes: ['medium', 'large'],
    addOns: [],
  },
  {
    id: 'pink-velvet-cupcake', name: 'Pink Velvet Cupcake', category: 'Desserts', price: 350,
    description: 'Soft pink velvet sponge with cream cheese frosting.',
    image: '/images/pink-velvet-cupcake.jpg', available: true, stock: 12,
    sizes: [], addOns: ['whipped-cream'],
  },
  {
    id: 'raspberry-rose-macarons', name: 'Raspberry Rose Macaron Box', category: 'Desserts', price: 900,
    description: 'Six handmade macarons with raspberry and rose filling.',
    image: '/images/macarons.jpg', available: false, stock: 0, // unavailable on purpose
    sizes: [], addOns: [],
  },
  {
    id: 'strawberry-cream-tart', name: 'Strawberry Cream Tart', category: 'Desserts', price: 620,
    description: 'Buttery shell, vanilla custard, and fresh strawberries.',
    image: '/images/strawberry-tart.jpg', available: true, stock: 8,
    sizes: [], addOns: ['whipped-cream'],
  },
  {
    id: 'butter-croissant', name: 'Butter Croissant', category: 'Bakery', price: 300,
    description: 'Flaky, golden, baked fresh every morning.',
    image: '/images/croissant.jpg', available: true, stock: 30,
    sizes: [], addOns: [],
  },
  {
    id: 'almond-pain-au-chocolat', name: 'Almond Pain au Chocolat', category: 'Bakery', price: 380,
    description: 'Chocolate-filled pastry topped with toasted almonds.',
    image: '/images/pain-au-chocolat.jpg', available: true, stock: 14,
    sizes: [], addOns: [],
  },
  {
    id: 'chicken-pesto-panini', name: 'Chicken Pesto Panini', category: 'Light Meals', price: 890,
    description: 'Grilled chicken, basil pesto, and mozzarella on ciabatta.',
    image: '/images/panini.jpg', available: true, stock: 10,
    sizes: [], addOns: ['extra-cheese', 'side-salad'],
  },
  {
    id: 'garden-quiche-salad', name: 'Garden Quiche & Salad', category: 'Light Meals', price: 780,
    description: 'Vegetable quiche served with a light house salad.',
    image: '/images/quiche.jpg', available: true, stock: 9,
    sizes: [], addOns: ['side-salad'],
  },
];