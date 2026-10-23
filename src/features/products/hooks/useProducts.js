import { useEffect } from 'react';
import { fetchCategories, fetchProducts } from '../productsSlice';
import { selectCategories, selectCategoriesError, selectCategoriesStatus, selectProducts, selectProductsError, selectProductsStatus } from '../productsSelectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
export function useProducts() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const status = useAppSelector(selectProductsStatus);
    const error = useAppSelector(selectProductsError);
    const categories = useAppSelector(selectCategories);
    const categoriesStatus = useAppSelector(selectCategoriesStatus);
    const categoriesError = useAppSelector(selectCategoriesError);
    useEffect(() => {
        if (status === 'idle')
            void dispatch(fetchProducts());
    }, [dispatch, status]);
    useEffect(() => {
        if (categoriesStatus === 'idle')
            void dispatch(fetchCategories());
    }, [categoriesStatus, dispatch]);
    return {
        products,
        status,
        error,
        categories,
        categoriesStatus,
        categoriesError,
        retry: () => {
            if (status !== 'loading')
                void dispatch(fetchProducts());
        },
    };
}
