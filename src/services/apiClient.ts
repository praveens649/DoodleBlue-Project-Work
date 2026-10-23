const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com'

export class ApiClientError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
  }
}

export async function getJson(path: string): Promise<unknown> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`)
  } catch {
    throw new ApiClientError('Unable to connect to the product service. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new ApiClientError(`Product service request failed with status ${response.status}.`, response.status)
  }

  try {
    return await response.json()
  } catch {
    throw new ApiClientError('Product service returned an invalid response.')
  }
}
