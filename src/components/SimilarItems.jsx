import MenuCard from './MenuCard.jsx';

// Shows up to 3 AVAILABLE items from the same category as the unavailable one
export default function SimilarItems({ item, items }) {
  const similar = items
    .filter((m) => m.category === item.category && m.id !== item.id && m.available && m.stock > 0)
    .slice(0, 3);

  if (similar.length === 0) {
    return <p>No similar items are available right now. Please browse the full menu.</p>;
  }
  return (
    <section aria-labelledby="similar-heading">
      <h2 id="similar-heading">Available alternatives</h2>
      <div className="grid">
        {similar.map((m) => <MenuCard key={m.id} item={m} />)}
      </div>
    </section>
  );
}