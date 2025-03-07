import { useEffect, useState, type ReactElement, useContext } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { FieldRenderProducts } from '../../components/field-render-product/field-render-products';
import {
  Container,
  StockEntryScreenContainer,
} from '../../components/field-render-product/field-render-products.styles';
import { ApplicationContext } from '../../../application-context';
import { ListProducts } from '../../components/list-products/list-products';
import { noop } from 'lodash';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { type Product } from '../../entities/product';
import { ObjectionMovimentationService } from '../../services/objection/objection-movimentation-service';
import { MeasurementEnum } from '../../entities/measurement-type';
import LoadingSpinner from '../../../common/components/loading-spinner/loading-spinner';
import { useNavigate } from 'react-router-dom';

const initialStateProduct: Product = {
  name: '',
  quantity: 0,
  measurement: MeasurementEnum.UNITY,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const StockEntryScreen = (): ReactElement => {
  const [product, setProduct] = useState<Product>(initialStateProduct);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsEntry, setProductsEntry] = useState<Product[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  const { httpClient } = useContext(ApplicationContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setIsLoading(true);
      const response = await new ObjectionProductService().getProducts(
        httpClient,
      );
      setProducts(response);
      setIsLoading(false);
    };
    fetchProducts().catch(noop);
  }, [httpClient]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      return p.name.toLowerCase().startsWith(product.name.toLowerCase());
    });
    setFilteredProducts(filtered);
    setNewProduct({ name: product.name, measurement: MeasurementEnum.UNITY });
  }, [product, products]);

  useEffect(() => {
    if (!searchActive) setProduct(initialStateProduct);
  }, [searchActive]);

  const handleSearch = (name: string): void => {
    setProduct({ ...product, name });
    setSearchActive(name !== '');
  };

  const onSubmit = async (): Promise<void> => {
    await new ObjectionMovimentationService().postInputMovimentation(
      httpClient,
      productsEntry,
    );
    setProductsEntry([]);
    navigate('/estoques');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              products={filteredProducts}
              productsEntry={productsEntry}
              setProductsEntry={setProductsEntry}
              httpClient={httpClient}
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
