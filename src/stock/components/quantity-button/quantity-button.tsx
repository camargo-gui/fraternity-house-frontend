import { type ReactElement, useState } from 'react';
import {
  ContainerQuantity,
  GreenCircle,
  QuantityBox,
} from './quantity-button.styles';

export const QuantityButton = (): ReactElement => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = (): void => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = (): void => {
    if (quantity > 0) {
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
