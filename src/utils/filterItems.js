// Pure function (no React): easy to explain and test.
export const PRICE_RANGES = [
    { id: 'all', label: 'Any price', min: 0, max: Infinity },
    { id: 'under-500', label: 'Under Rs. 500', min: 0, max: 499 },
    { id: '500-800', label: 'Rs. 500 to 800', min: 500, max: 800 },
    { id: 'over-800', label: 'Over Rs. 800', min: 801, max: Infinity },
];
export const DIET_OPTIONS = [
  { id: 'any', label: 'Any' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
];

export const SORT_OPTIONS = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: low to high' },
    { id: 'price-desc', label: 'Price: high to low' },
    { id: 'name', label: 'Name: A to Z' },
];

export function filterAndSortItems(items, { search, category, priceId, sortId, availableOnly = false, dietId = 'any' }) {    const text = search.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.id === priceId) ?? PRICE_RANGES[0];

    const filtered = items.filter((item) => {
        const matchesText =
            text === '' ||
            item.name.toLowerCase().includes(text) ||
            (item.ingredients ?? []).some((i) => i.toLowerCase().includes(text)) ||
            (item.description ?? '').toLowerCase().includes(text) || item.category.toLowerCase().includes(text);

        const matchesAvailability = !availableOnly || (item.available && item.stock > 0);
        const matchesCategory = category === 'All' || item.category === category;
        const matchesPrice = item.price >= range.min && item.price <= range.max;
        const matchesDiet = dietId === 'any' || item[dietId] === true;
        return matchesText && matchesCategory && matchesPrice && matchesAvailability && matchesDiet;
    });

    // [...filtered] makes a copy, so we never mutate the original array
    const sorted = [...filtered];
    if (sortId === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sortId === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sortId === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
}