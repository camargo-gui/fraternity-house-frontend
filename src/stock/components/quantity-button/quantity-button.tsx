import { type ReactElement, useState, useEffect } from 'react';
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

  useEffect(() => {
    handleIncrement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = (): void => {
    updateQuantity(quantity + 1);
  };

  const handleDecrement = (): void => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  const updateQuantity = (newQuantity: number): void => {
    const updatedProducts = productsEntry.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    setProductsEntry(updatedProducts);
    setQuantity(newQuantity);
  };

  return (
    <ContainerQuantity>
      <GreenCircle onClick={handleDecrement}>-</GreenCircle>
      <QuantityBox>{quantity}</QuantityBox>
      <GreenCircle onClick={handleIncrement}>+</GreenCircle>
    </ContainerQuantity>
  );
};
