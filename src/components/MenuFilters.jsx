import { CATEGORIES } from '../data/menuItems.js';
import { PRICE_RANGES, SORT_OPTIONS } from '../utils/filterItems.js';

// Props: current values + one callback that tells the parent what changed
export default function MenuFilters({ search, category, priceId, sortId, availableOnly, onChange, onClear, hasActiveFilters }) {
    return (
        <form className="filters" role="search" aria-label="Filter menu" onSubmit={(e) => e.preventDefault()}>
            <div className="field field-wide">
                <label htmlFor="menu-search">Search the menu</label>
                <input id="menu-search" type="search" value={search} placeholder="Try “rose” or “croissant”"
                    onChange={(e) => onChange('q', e.target.value, '')} />
            </div>

            <div className="field">
                <label htmlFor="menu-category">Category</label>
                <select id="menu-category" value={category} onChange={(e) => onChange('category', e.target.value, 'All')}>
                    <option value="All">All categories</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="field">
                <label htmlFor="menu-price">Price</label>
                <select id="menu-price" value={priceId} onChange={(e) => onChange('price', e.target.value, 'all')}>
                    {PRICE_RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
            </div>

            <div className="field">
                <label htmlFor="menu-sort">Sort by</label>
                <select id="menu-sort" value={sortId} onChange={(e) => onChange('sort', e.target.value, 'featured')}>
                    {SORT_OPTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
            </div>
            <div className="field field-check">
                <label className="check-label" htmlFor="menu-available">
                    <input id="menu-available" type="checkbox" checked={availableOnly}
                        onChange={(e) => onChange('available', e.target.checked ? '1' : '', '')} />
                    Available now only
                </label>
            </div>
            {hasActiveFilters && (
                <button type="button" className="btn btn-secondary" onClick={onClear}>Clear filters</button>
            )}
        </form>
    );
}