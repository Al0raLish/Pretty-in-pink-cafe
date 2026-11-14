// Fictional ingredient, portion and allergen details for the fictional café.
// A real café would have to verify allergen information before publishing it.
export const ITEM_DETAILS = {
  'rose-petal-latte': {
    ingredients: ['Espresso', 'Steamed milk', 'Rose infusion'],
    allergens: ['Milk'], vegetarian: true, vegan: false,
    portion: 'Small 240 ml, Medium 350 ml, Large 470 ml',
  },
  'honey-cardamom-cappuccino': {
    ingredients: ['Espresso', 'Steamed milk', 'Honey', 'Cardamom'],
    allergens: ['Milk'], vegetarian: true, vegan: false,
    portion: 'Small 240 ml, Medium 350 ml, Large 470 ml',
  },
  'vanilla-cold-brew': {
    ingredients: ['Cold brew coffee', 'Ice', 'Vanilla'],
    allergens: [], vegetarian: true, vegan: true,
    portion: 'Medium 350 ml, Large 470 ml',
  },
  'strawberry-blush-lemonade': {
    ingredients: ['Strawberries', 'Lemon', 'Sparkling water', 'Sugar'],
    allergens: [], vegetarian: true, vegan: true,
    portion: 'Small 240 ml, Medium 350 ml, Large 470 ml',
  },
  'peach-hibiscus-cooler': {
    ingredients: ['Hibiscus tea', 'Peach', 'Mint', 'Ice'],
    allergens: [], vegetarian: true, vegan: true,
    portion: 'Medium 350 ml, Large 470 ml',
  },
  'pink-velvet-cupcake': {
    ingredients: ['Flour', 'Cocoa', 'Buttermilk', 'Cream cheese frosting'],
    allergens: ['Gluten', 'Milk', 'Egg'], vegetarian: true, vegan: false,
    portion: '1 cupcake (about 90 g)',
  },
  'raspberry-rose-macarons': {
    ingredients: ['Almond flour', 'Egg whites', 'Raspberry', 'Rose'],
    allergens: ['Nuts', 'Egg'], vegetarian: true, vegan: false,
    portion: 'Box of 6 macarons',
  },
  'strawberry-cream-tart': {
    ingredients: ['Butter pastry shell', 'Vanilla custard', 'Fresh strawberries'],
    allergens: ['Gluten', 'Milk', 'Egg'], vegetarian: true, vegan: false,
    portion: '1 tart (about 140 g)',
  },
  'butter-croissant': {
    ingredients: ['Flour', 'Butter', 'Yeast'],
    allergens: ['Gluten', 'Milk'], vegetarian: true, vegan: false,
    portion: '1 croissant (about 70 g)',
  },
  'almond-pain-au-chocolat': {
    ingredients: ['Laminated pastry', 'Dark chocolate', 'Toasted almonds'],
    allergens: ['Gluten', 'Milk', 'Egg', 'Nuts'], vegetarian: true, vegan: false,
    portion: '1 pastry (about 90 g)',
  },
  'chicken-pesto-panini': {
    ingredients: ['Ciabatta', 'Grilled chicken', 'Basil pesto', 'Mozzarella'],
    allergens: ['Gluten', 'Milk', 'Nuts'], vegetarian: false, vegan: false,
    portion: '1 panini (about 280 g)',
  },
  'garden-quiche-salad': {
    ingredients: ['Pastry', 'Eggs', 'Cream', 'Seasonal vegetables', 'House salad'],
    allergens: ['Gluten', 'Milk', 'Egg'], vegetarian: true, vegan: false,
    portion: '1 quiche slice with salad (about 300 g)',
  },
};