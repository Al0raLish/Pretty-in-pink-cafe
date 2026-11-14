import { useSearchParams } from 'react-router-dom';
import { useMenu } from '../context/useMenu.js';
import { filterAndSortItems } from '../utils/filterItems.js';
import MenuFilters from '../components/MenuFilters.jsx';
import MenuCard from '../components/MenuCard.jsx';
import DeliveryProgress from '../components/DeliveryProgress.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';

export default function MenuPage() {
    const { status, items, error, reload } = useMenu();
    const [searchParams, setSearchParams] = useSearchParams();
    const dietId = searchParams.get('diet') ?? 'any';
    const search = searchParams.get('q') ?? '';
    const category = searchParams.get('category') ?? 'All';
    const priceId = searchParams.get('price') ?? 'all';
    const sortId = searchParams.get('sort') ?? 'featured';
    const availableOnly = searchParams.get('available') === '1';

    function handleChange(key, value, defaultValue) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (!value || value === defaultValue) next.delete(key);
            else next.set(key, value);
            return next;
        }, { replace: true });
    }

    const hasActiveFilters =
        search !== '' || category !== 'All' || priceId !== 'all' || sortId !== 'featured' || availableOnly || dietId !== 'any';
    const results = filterAndSortItems(items, { search, category, priceId, sortId, availableOnly, dietId });

    return (
        <>
            <h1>Our Menu</h1>
            <DeliveryProgress />

            {status === 'loading' && <LoadingState />}
            {status === 'error' && <ErrorState message={error} onRetry={reload} />}

            {status === 'ready' && (
                <>
                    <MenuFilters
                        search={search} category={category} priceId={priceId} sortId={sortId}
                        availableOnly={availableOnly}
                        onChange={handleChange}
                        onClear={() => setSearchParams({}, { replace: true })}
                        hasActiveFilters={hasActiveFilters}
                    />

                    <p className="result-count" aria-live="polite">
                        Showing {results.length} of {items.length} items
                    </p>

                    {items.length === 0 ? (
                        // EMPTY DATASET: there is nothing to filter at all
                        <div className="empty-state">
                            <h2>The menu is being prepared</h2>
                            <p>We have no items to show right now. Please check back soon.</p>
                            <button type="button" className="btn btn-secondary" onClick={reload}>Refresh</button>
                        </div>
                    ) : results.length === 0 ? (
                        // NO MATCHES: items exist, but the filters exclude them all
                        <div className="empty-state">
                            <h2>No items match your search</h2>
                            <p>Try a different word, a wider price range, or another category.</p>
                            <button type="button" className="btn btn-primary"
                                onClick={() => setSearchParams({}, { replace: true })}>
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid">
                            {results.map((item) => <MenuCard key={item.id} item={item} />)}
                        </div>
                    )}
                </>
            )}
        </>
    );
}