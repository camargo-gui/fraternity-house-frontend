import { type ReactElement, useState } from 'react';
import {
  ContainerQuantity,
  GreenCircle,
  QuantityBox,
} from './quantity-button.styles';
import { type Product } from '../../entities/product';

interface Props {
  productsEntry: Product[];
  setProductsEntry: (products: Product[]) => void;
  product: Product;
}

export const QuantityButton = ({
  productsEntry,
  setProductsEntry,
  product,
}: Props): ReactElement => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = (): void => {
    const productList = productsEntry.filter((p) => p.name !== product.name);
    productList.push({ ...product, quantity: quantity + 1 });
    setProductsEntry(productList);
    setQuantity(quantity + 1);
  };

  const handleDecrement = (): void => {
    if (quantity > 0) {
      const productList = productsEntry.filter((p) => p.name !== product.name);
      productList.push({ ...product, quantity: quantity - 1 });
      setProductsEntry(productList);
      setQuantity(quantity - 1);
    }
  };

  return (
    <ContainerQuantity>
      <GreenCircle onClick={handleDecrement}>-</GreenCircle>
      <QuantityBox>{quantity}</QuantityBox>
      <GreenCircle onClick={handleIncrement}>+</GreenCircle>
    </ContainerQuantity>
  );
};
