import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProductsPage } from './ProductsPage'
import { makeStore } from '../../../store/store'

describe('ProductsPage', () => {
  it('renders loading and success verification states', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('[]', { status: 200 })))

    render(<Provider store={makeStore()}><ProductsPage /></Provider>)

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('0 products received.')).toBeInTheDocument())
  })
})
