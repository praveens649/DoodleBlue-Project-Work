import React from 'react'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, quantities, onAdd, onDecrease, onIncrease }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={quantities[product.id] ?? 0}
          onAdd={onAdd}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      ))}
    </div>
  )
}
