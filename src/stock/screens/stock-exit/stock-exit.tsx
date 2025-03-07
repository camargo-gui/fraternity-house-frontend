import { useEffect, useState, type ReactElement, useContext } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { type Product } from '../../entities/product';
import { FieldRenderProducts } from '../../components/field-render-product/field-render-products';
import {
  Container,
  StockEntryScreenContainer,
} from '../../components/field-render-product/field-render-products.styles';
import { ApplicationContext } from '../../../application-context';
import { ListProducts } from '../../components/list-products/list-products';
import { noop } from 'lodash';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { ObjectionMovimentationService } from '../../services/objection/objection-movimentation-service';
import { MeasurementEnum } from '../../entities/measurement-type';
import { useNavigate } from 'react-router-dom';

const initialStateProduct: Product = {
  name: '',
  quantity: 0,
  measurement: MeasurementEnum.UNITY,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const StockExit = (): ReactElement => {
  const [product, setProduct] = useState<Product>(initialStateProduct);
  const { httpClient } = useContext(ApplicationContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsEntry, setProductsEntry] = useState<Product[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const response = await new ObjectionProductService().getStock(httpClient);
      setProducts(response);
    };
    fetchProducts().catch(noop);
  }, [httpClient]);

  useEffect(() => {
    if (!searchActive) setProduct(initialStateProduct);
  }, [searchActive]);

  const handleSearch = (name: string): void => {
    setProduct({ ...product, name });
    const filtered = products.filter((product) => {
      return product.name.toLowerCase().startsWith(name.toLowerCase());
    });
    setFilteredProducts(filtered);
    setSearchActive(name !== '');
  };

  const onSubmit = async (): Promise<void> => {
    await new ObjectionMovimentationService().postOutputMovimentation(
      httpClient,
      productsEntry,
    );
    setProductsEntry([]);
    navigate('/estoques');
  };

  return (
    <>
      <StockEntryScreenContainer>
        <FormInput
          type="search"
          id="search"
          label={''}
          value={product.name}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            handleSearch(target.value);
          }}
        />
        {searchActive && (
          <Container>
            <FieldRenderProducts
              products={filteredProducts}
              productsEntry={productsEntry}
              setProductsEntry={setProductsEntry}
              httpClient={httpClient}
              setNewProduct={noop}
              setSearchActive={setSearchActive}
            />
          </Container>
        )}
      </StockEntryScreenContainer>

      <ListProducts
        productsEntry={productsEntry}
        onSubmit={onSubmit}
        setProductsEntry={setProductsEntry}
      />
    </>
  );
};
