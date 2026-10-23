import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppFooter } from '../components/layout/AppFooter';
import { AppHeader } from '../components/layout/AppHeader';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
export function AppShell({ children }) {
    return (_jsxs("div", { className: "app-shell", children: [_jsx(AppHeader, {}), _jsx("main", { className: "flex-1", children: children }), _jsx(AppFooter, {})] }));
}
export function NotFoundPage() {
    return (_jsxs(PageContainer, { className: "flex min-h-[60vh] flex-col items-center justify-center text-center", children: [_jsx("p", { className: "mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand", children: "404" }), _jsx("h1", { className: "mb-3 text-3xl font-extrabold text-ink", children: "Page not found" }), _jsx("p", { className: "mb-8 max-w-md text-muted", children: "The page you are looking for does not exist." }), _jsx(Button, { to: "/", children: "Back to products" })] }));
}
