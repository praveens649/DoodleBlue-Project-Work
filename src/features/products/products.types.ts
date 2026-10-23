export type ProductId = number

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ApiError = {
  message: string
  status?: number
}
