export default function ItemInfo({ item }) {
  const hasIngredients = Array.isArray(item.ingredients) && item.ingredients.length > 0;
  const allergens = Array.isArray(item.allergens) ? item.allergens : null; // null = not provided

  return (
    <section className="item-info" aria-labelledby="info-heading">
      <h2 id="info-heading">What’s in it</h2>
      <dl className="info-list">
        <div>
          <dt>Ingredients</dt>
          <dd>{hasIngredients ? item.ingredients.join(', ') : 'Ingredient details coming soon.'}</dd>
        </div>
        <div>
          <dt>Portion</dt>
          <dd>{item.portion || 'Portion details coming soon.'}</dd>
        </div>
        <div>
          <dt>Dietary</dt>
          <dd>{item.vegan ? 'Vegan' : item.vegetarian ? 'Vegetarian' : 'Contains meat'}</dd>
        </div>
        <div>
          <dt>Allergens</dt>
          <dd>
            {allergens === null
              ? 'Allergen details coming soon.'
              : allergens.length === 0 ? 'No common allergens listed.' : `Contains: ${allergens.join(', ')}`}
          </dd>
        </div>
      </dl>
      <p className="hint">Demo data for a fictional café. A real café must verify allergen information.</p>
    </section>
  );
}