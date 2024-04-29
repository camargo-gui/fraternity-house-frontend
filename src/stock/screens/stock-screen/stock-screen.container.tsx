import { type ReactElement, useEffect, useState, useContext } from 'react';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { type Product } from '../../entities/product';
import { noop } from 'lodash';
import { ApplicationContext } from '../../../application-context';
import { StockTable } from '../../components/stock-table/stock-table';
import { HeaderButtons } from '../../components/header-buttons/header-buttons';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';

export const StockScreenContainer = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const { httpClient } = useContext(ApplicationContext);
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      dispatch(setLoading(true));
      const response = await new ObjectionProductService().getStock(httpClient);
      setProducts(response);
      dispatch(setLoading(false));
    };
    fetchProducts().catch(noop);
  }, [dispatch, httpClient]);

  return (
    <>
      <HeaderButtons />
      <StockTable products={products} />
    </>
  );
};
