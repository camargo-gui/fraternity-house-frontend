import { type Product } from '../../entities/product';
import { QuantityButton } from '../quantity-button/quantity-button';
import TableComponent from '../../../common/components/table/table';
import { ContainerListProducts } from './list-products.styles';
import { Button } from '../../../common/components/button/button';
import { type ReactElement } from 'react';

interface Props {
  productsEntry: Product[];
  onSubmit: () => Promise<void>;
  setProductsEntry: (products: Product[]) => void;
}

export const ListProducts = ({
  productsEntry,
  onSubmit,
  setProductsEntry,
}: Props): ReactElement => {
  const columns = [
    {
      header: 'Lista de Produtos',
      accessor: 'name',
    },
    {
      header: 'Quantidade',
      accessor: 'actions',
      render: (product: Product) => (
        <QuantityButton
          productsEntry={productsEntry}
          setProductsEntry={setProductsEntry}
          product={product}
        />
      ),
    },
  ];
  return (
    <>
      <ContainerListProducts>
        <TableComponent
          columns={columns}
          data={productsEntry}
          showEmptyTable={true}
        />
      </ContainerListProducts>
      <Button
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          onSubmit();
        }}
        text="Finalizar"
      />
    </>
  );
};
