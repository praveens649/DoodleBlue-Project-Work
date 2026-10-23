import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { ApiClientError } from '../../services/apiClient'
import { getCategories, getProductById, getProducts } from './api/productsApi'
import type { ApiError, Product, RequestStatus } from './products.types'

type ProductsState = {
  products: Product[]
  categories: string[]
  selectedProduct: Product | null
  selectedProductId: number | null
  status: RequestStatus
  error: ApiError | null
  selectedProductStatus: RequestStatus
  selectedProductError: ApiError | null
  categoriesStatus: RequestStatus
  categoriesError: ApiError | null
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  selectedProduct: null,
  selectedProductId: null,
  status: 'idle',
  error: null,
  selectedProductStatus: 'idle',
  selectedProductError: null,
  categoriesStatus: 'idle',
  categoriesError: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value) || !isRecord(value.rating)) return false
  return typeof value.id === 'number'
    && Number.isInteger(value.id)
    && typeof value.title === 'string'
    && typeof value.price === 'number'
    && Number.isFinite(value.price)
    && typeof value.description === 'string'
    && typeof value.category === 'string'
    && typeof value.image === 'string'
    && typeof value.rating.rate === 'number'
    && typeof value.rating.count === 'number'
}

function validateProducts(value: unknown): Product[] {
  if (!Array.isArray(value) || !value.every(isProduct)) {
    throw new Error('Product service returned an unexpected product list.')
  }
  return value
}

function validateProduct(value: unknown): Product {
  if (!isProduct(value)) throw new Error('Product service returned an unexpected product.')
  return value
}

function validateCategories(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((category) => typeof category === 'string')) {
    throw new Error('Product service returned an unexpected category list.')
  }
  return value
}

function errorPayload(error: unknown): ApiError {
  if (error instanceof ApiClientError) return { message: error.message, status: error.status }
  return { message: error instanceof Error ? error.message : 'Unable to load product data.' }
}

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: ApiError }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return validateProducts(await getProducts())
    } catch (error) {
      return rejectWithValue(errorPayload(error))
    }
  },
  {
    condition: (_, { getState }) => (getState() as RootState).products.status !== 'loading',
  },
)

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: ApiError }>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    if (!Number.isInteger(id) || id <= 0) return rejectWithValue({ message: 'Product ID must be a positive integer.' })
    try {
      return validateProduct(await getProductById(id))
    } catch (error) {
      return rejectWithValue(errorPayload(error))
    }
  },
  {
    condition: (id, { getState }) => {
      const state = (getState() as RootState).products
      return !Number.isInteger(id) || id <= 0 || !(state.selectedProductStatus === 'loading' && state.selectedProductId === id)
    },
  },
)

export const fetchCategories = createAsyncThunk<string[], void, { rejectValue: ApiError }>(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return validateCategories(await getCategories())
    } catch (error) {
      return rejectWithValue(errorPayload(error))
    }
  },
  {
    condition: (_, { getState }) => (getState() as RootState).products.categoriesStatus !== 'loading',
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? { message: 'Unable to load products.' }
      })
      .addCase(fetchProductById.pending, (state, action) => {
        state.selectedProductStatus = 'loading'
        state.selectedProductError = null
        state.selectedProductId = action.meta.arg
        state.selectedProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        if (state.selectedProductId !== action.meta.arg) return
        state.selectedProductStatus = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        if (state.selectedProductId !== action.meta.arg) return
        state.selectedProductStatus = 'failed'
        state.selectedProductError = action.payload ?? { message: 'Unable to load this product.' }
        state.selectedProduct = null
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading'
        state.categoriesError = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed'
        state.categoriesError = action.payload ?? { message: 'Unable to load categories.' }
      })
  },
})

export default productsSlice.reducer
