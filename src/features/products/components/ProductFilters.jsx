import React from 'react'

export function ProductFilters({ categories, selectedCategory, onCategoryChange, sort, onSortChange, categoriesError }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6" aria-label="Product filters">
      <div className="flex justify-end">
        <label className="flex w-full items-center justify-between gap-3 text-sm font-bold text-ink sm:w-auto">
          Sort by
          <select value={sort} onChange={(event) => onSortChange(event.target.value)} className="h-10 min-w-32 rounded-lg border border-border bg-white px-3 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between text-sm font-bold text-ink"><span>Browse by category</span><span className="font-normal text-muted">{categories.length} available</span></div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onCategoryChange('all')} className={`rounded-full border px-4 py-2 text-sm font-bold capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${selectedCategory === 'all' ? 'border-brand bg-brand text-white' : 'border-border bg-white text-muted hover:border-brand hover:text-brand'}`}>All</button>
          {categories.map((category) => (
            <button type="button" key={category} onClick={() => onCategoryChange(category)} className={`rounded-full border px-4 py-2 text-sm font-bold capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${selectedCategory === category ? 'border-brand bg-brand text-white' : 'border-border bg-white text-muted hover:border-brand hover:text-brand'}`}>
              {category}
            </button>
          ))}
        </div>
        {categoriesError && <p className="mt-2 text-sm text-red-700" role="status">{categoriesError}</p>}
      </div>
    </section>
  )
}
