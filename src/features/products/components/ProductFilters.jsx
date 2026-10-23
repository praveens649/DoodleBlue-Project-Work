import React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '../../../components/ui/Input'

export function ProductFilters({ categories, selectedCategory, onCategoryChange, search, onSearchChange, sort, onSortChange, categoriesError }) {
  return (
    <section className="space-y-5 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5" aria-label="Product filters">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-1">
          <Input label="Search products" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search by product title" />
          <Search className="pointer-events-none absolute right-3 top-9 text-muted" size={18} aria-hidden="true" />
          {search && (
            <button type="button" onClick={() => onSearchChange('')} className="absolute right-10 top-9 text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" aria-label="Clear search">
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <label className="flex flex-col gap-2 text-sm font-bold text-ink lg:w-56">
          Sort by
          <select value={sort} onChange={(event) => onSortChange(event.target.value)} className="h-11 rounded-[10px] border border-border bg-white px-3 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
      <div>
        <div className="mb-2 text-sm font-bold text-ink">Category</div>
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
