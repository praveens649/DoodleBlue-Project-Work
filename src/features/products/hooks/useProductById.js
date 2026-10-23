import { useEffect } from 'react';
import { fetchProductById } from '../productsSlice';
import { selectSelectedProduct, selectSelectedProductError, selectSelectedProductId, selectSelectedProductStatus } from '../productsSelectors';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
export function useProductById(id) {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectSelectedProduct);
    const selectedProductId = useAppSelector(selectSelectedProductId);
    const status = useAppSelector(selectSelectedProductStatus);
    const error = useAppSelector(selectSelectedProductError);
    useEffect(() => {
        if (id !== null && !(selectedProductId === id && status === 'succeeded'))
            void dispatch(fetchProductById(id));
    }, [dispatch, id, selectedProductId, status]);
    return { product: selectedProductId === id ? product : null, status, error, retry: () => {
            if (id !== null && status !== 'loading')
                void dispatch(fetchProductById(id));
        } };
}
