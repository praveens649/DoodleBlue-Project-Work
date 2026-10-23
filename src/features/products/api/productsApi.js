import { getJson } from '../../../services/apiClient';
export function getProducts() {
    return getJson('/products');
}
export function getProductById(id) {
    return getJson(`/products/${id}`);
}
export function getCategories() {
    return getJson('/products/categories');
}
