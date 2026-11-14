import { useSearchParams } from 'react-router-dom';
import { menuItems } from '../data/menuItems.js';
import { filterAndSortItems } from '../utils/filterItems.js';
import MenuFilters from '../components/MenuFilters.jsx';
import MenuCard from '../components/MenuCard.jsx';

export default function MenuPage() {
    // Filters are stored in the URL (e.g. /menu?category=Coffee&sort=price-asc).
    // So Back/Forward, refresh, and "Back to menu" from a details page keep them.
    const [searchParams, setSearchParams] = useSearchParams();
    const availableOnly = searchParams.get('available') === '1';
    const search = searchParams.get('q') ?? '';
    const category = searchParams.get('category') ?? 'All';
    const priceId = searchParams.get('price') ?? 'all';
    const sortId = searchParams.get('sort') ?? 'featured';

    function handleChange(key, value, defaultValue) {
        // Functional update: the new params depend on the previous ones
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (!value || value === defaultValue) next.delete(key);
            else next.set(key, value);
            return next;
        }, { replace: true });
    }

    const hasActiveFilters = search !== '' || category !== 'All' || priceId !== 'all' || sortId !== 'featured';
    const results = filterAndSortItems(menuItems, { search, category, priceId, sortId, availableOnly });

    return (
        <>
            <h1>Our Menu</h1>

            <MenuFilters
                search={search} category={category} priceId={priceId} sortId={sortId}
                onChange={handleChange}
                onClear={() => setSearchParams({}, { replace: true })}
                hasActiveFilters={hasActiveFilters}
            />

            {/* aria-live announces the result count to screen readers */}
            <p className="result-count" aria-live="polite">
                Showing {results.length} of {menuItems.length} items
            </p>

            {menuItems.length === 0 ? (
                <div className="empty-state">
                    <h2>The menu is being prepared</h2>
                    <p>We have no items to show right now. Please check back soon.</p>
                </div>
            ) : results.length === 0 ? (
                <div className="empty-state">
                    <h2>No items match your search</h2>
                    <p>Try a different word, a wider price range, or another category.</p>
                    <button type="button" className="btn btn-primary" onClick={() => setSearchParams({}, { replace: true })}>
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid">
                    {results.map((item) => <MenuCard key={item.id} item={item} />)}
                </div>
            )}
        </>
    );
}