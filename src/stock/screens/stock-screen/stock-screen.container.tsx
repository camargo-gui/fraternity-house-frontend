import { type ReactElement, useEffect, useState, useContext } from 'react';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { type Product } from '../../entities/product';
import { noop } from 'lodash';
import { ApplicationContext } from '../../../application-context';
import { StockTable } from '../../components/stock-table/stock-table';
import { HeaderButtons } from '../../components/header-buttons/header-buttons';

export const StockScreenContainer = (): ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const { httpClient } = useContext(ApplicationContext);
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const response = await new ObjectionProductService().getProducts(
        httpClient,
      );
      setProducts(response);
    };
    fetchProducts().catch(noop);
  }, [httpClient]);

  return (
    <>
      <HeaderButtons />
      <StockTable products={products} />
    </>
  );
};
