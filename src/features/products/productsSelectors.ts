import type { RootState } from '../../store/store'

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsStatus = (state: RootState) => state.products.status
export const selectProductsError = (state: RootState) => state.products.error
export const selectCategories = (state: RootState) => state.products.categories
export const selectCategoriesStatus = (state: RootState) => state.products.categoriesStatus
export const selectCategoriesError = (state: RootState) => state.products.categoriesError
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct
export const selectSelectedProductStatus = (state: RootState) => state.products.selectedProductStatus
export const selectSelectedProductError = (state: RootState) => state.products.selectedProductError
