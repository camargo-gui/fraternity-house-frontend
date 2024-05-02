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
  const [filterText, setFilterText] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const { httpClient } = useContext(ApplicationContext);
  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      dispatch(setLoading(true));
      const response = await new ObjectionProductService().getStock(httpClient);
      setProducts(response);
      setFilteredProducts(response);
      dispatch(setLoading(false));
    };
    fetchProducts().catch(noop);
  }, [dispatch, httpClient]);

  useEffect(() => {
    if (filterText === '') {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().startsWith(filterText.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [filterText, products]);

  return (
    <>
      <HeaderButtons setText={setFilterText} />
      <StockTable products={filteredProducts} />
    </>
  );
};
