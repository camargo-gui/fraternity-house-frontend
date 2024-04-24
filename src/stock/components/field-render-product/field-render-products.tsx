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
  setProductsEntry: (products: Product[]) => void;
}

export const FieldRenderProducts = ({
  products,
  productsEntry,
  setProductsEntry,
}: Props): ReactElement => {
  const handleSubmit = (product: Product): void => {
    setProductsEntry([...productsEntry, product]);
  };

  return (
    <Container>
      {products.length > 0
        ? products.map((product) => (
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
          ))
        : null}
    </Container>
  );
};
