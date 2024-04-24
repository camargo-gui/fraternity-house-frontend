import { type ReactElement } from 'react';
import { type Product } from '../../entities/product';
import {
  Button,
  Container,
  DivTextProduct,
  TextProduct,
} from './field-render-products.styles';
import { uniqueId } from 'lodash';

interface Props {
  products: Product[];
  productsEntry: Product[];
  newProduct?: Product | null;
  setNewProduct?: (product: Product | null) => void;
  setProductsEntry: (products: Product[]) => void;
}

export const FieldRenderProducts = ({
  products,
  productsEntry,
  newProduct,
  setNewProduct,
  setProductsEntry,
}: Props): ReactElement => {
  const handleSubmit = (product: Product): void => {
    setProductsEntry([...productsEntry, product]);
  };

  const renderFilteredProducts = (): ReactElement[] => {
    console.log(products);
    return products.map((product) => (
      <DivTextProduct key={uniqueId()}>
        <TextProduct>{product.name}</TextProduct>
        <Button
          onClick={() => {
            handleSubmit(product);
          }}
        >
          Adicionar
        </Button>
      </DivTextProduct>
    ));
  };

  const renderRegisterProduct = (): ReactElement => {
    return (
      <DivTextProduct key={uniqueId()}>
        <TextProduct>{newProduct?.name}</TextProduct>
        <Button onClick={() => {}}>Cadastrar</Button>
      </DivTextProduct>
    );
  };

  const renderProductNotFound = (): ReactElement => {
    return (
      <DivTextProduct key={uniqueId()}>
        <TextProduct>Produto fora de estoque</TextProduct>
      </DivTextProduct>
    );
  };

  return (
    <Container>
      {products.length > 0
        ? renderFilteredProducts()
        : newProduct
          ? renderRegisterProduct()
          : renderProductNotFound()}
    </Container>
  );
};
