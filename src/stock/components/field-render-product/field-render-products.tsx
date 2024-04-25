/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, type ReactElement } from 'react';
import { Product } from '../../entities/product';
import {
  Button,
  Container,
  DivTextProduct,
  TextProduct,
} from './field-render-products.styles';
import { uniqueId } from 'lodash';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { type HttpClient } from '../../../common/http-client/http-client';
import { FormInput } from '../../../common/components/form-input/form-input';
import { MeasurementEnum } from '../../entities/measurement-type';

interface Props {
  products: Product[];
  productsEntry: Product[];
  newProduct?: Product | null;
  setNewProduct: (product: Product | null) => void;
  setProductsEntry: (products: Product[]) => void;
  httpClient: HttpClient;
}

export const FieldRenderProducts = ({
  products,
  productsEntry,
  newProduct,
  setNewProduct,
  setProductsEntry,
  httpClient,
}: Props): ReactElement => {
  const [selectedMeasurement, setSelectedMeasurement] = useState({
    label: 'UNITY',
    value: MeasurementEnum.UNITY,
  });
  const handleSubmit = (product: Product): void => {
    const alreadyExists = productsEntry.find(
      (productEntry) => productEntry.name === product.name,
    );
    if (alreadyExists === undefined || alreadyExists === null) {
      setProductsEntry([...productsEntry, product]);
    }
  };

  const renderFilteredProducts = (): ReactElement[] => {
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

  const handleRegisterProduct = async (): Promise<void> => {
    if (newProduct) {
      const response = await new ObjectionProductService().postProduct(
        httpClient,
        newProduct,
      );
      if (response) {
        setProductsEntry([...productsEntry, response]);
      }
    }
  };

  const renderRegisterProduct = (): ReactElement => {
    if (newProduct === null) return <></>;
    const options = [
      { value: MeasurementEnum.UNITY, label: 'Unidade' },
      { value: MeasurementEnum.KG, label: 'KG' },
      { value: MeasurementEnum.L, label: 'L' },
    ];
    return (
      <DivTextProduct key={uniqueId()}>
        <TextProduct>{newProduct?.name}</TextProduct>
        <FormInput
          type="select"
          options={options}
          value={selectedMeasurement.label}
          id="measurement-type"
          style={{
            backgroundColor: '#e2e2e2',
            marginLeft: '5px',
            height: '50px',
            border: '0.5px solid',
          }}
          onChange={(e) => {
            const target = e.target as HTMLSelectElement;
            setSelectedMeasurement({
              label: target.options[target.selectedIndex].text,
              value:
                MeasurementEnum[target.value as keyof typeof MeasurementEnum],
            });
            setNewProduct(
              new Product(
                newProduct?.name ?? '',
                MeasurementEnum[target.value as keyof typeof MeasurementEnum],
              ),
            );
          }}
        />
        <Button onClick={handleRegisterProduct}>Cadastrar</Button>
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
