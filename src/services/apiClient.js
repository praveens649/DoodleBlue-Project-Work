const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com';
export class ApiClientError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.name = 'ApiClientError';
        this.status = status;
    }
}
export async function getJson(path) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}${path}`);
    }
    catch {
        throw new ApiClientError('Unable to connect to the product service. Check your connection and try again.');
    }
    if (!response.ok) {
        throw new ApiClientError(`Product service request failed with status ${response.status}.`, response.status);
    }
    try {
        return await response.json();
    }
    catch {
        throw new ApiClientError('Product service returned an invalid response.');
    }
}
