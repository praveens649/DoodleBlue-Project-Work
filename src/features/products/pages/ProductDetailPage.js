import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageContainer } from '../../../components/layout/PageContainer';
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner';
import { useProductById } from '../hooks/useProductById';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../../utils/formatCurrency';
export function ProductDetailPage() {
    const { id } = useParams();
    const parsedId = id === undefined ? Number.NaN : Number(id);
    const productId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
    const { product, status, error, retry } = useProductById(productId);
    if (productId === null) {
        return _jsxs(PageContainer, { children: [_jsx("p", { className: "eyebrow", children: "Product details" }), _jsx("h1", { className: "page-title", children: "Product not found" }), _jsx("p", { className: "page-intro", children: "This product ID is not valid." })] });
    }
    return (_jsxs(PageContainer, { children: [_jsx("p", { className: "eyebrow", children: "Product details" }), status === 'loading' && _jsx(Spinner, { label: "Loading product..." }), status === 'failed' && (_jsxs("div", { className: "space-y-4", role: "alert", children: [_jsx("h1", { className: "page-title", children: "Product not found" }), _jsx("p", { className: "page-intro", children: error?.message ?? 'This product could not be loaded.' }), _jsx(Button, { type: "button", onClick: retry, children: "Try again" })] })), status === 'succeeded' && product && (_jsxs("div", { children: [_jsx("h1", { className: "page-title", children: product.title }), _jsx("p", { className: "mb-4 text-xl font-bold text-brand", children: formatCurrency(product.price) }), _jsx("p", { className: "page-intro", children: product.description })] }))] }));
}
