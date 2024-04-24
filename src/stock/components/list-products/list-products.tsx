import { type ReactElement } from 'react';
import { type Product } from '../../entities/product';
import { QuantityButton } from '../quantity-button/quantity-button';
import TableComponent from '../../../common/components/table/table';
import { ContainerListProducts } from './list-products.styles';

interface Props {
  productsEntry: Product[];
}

const columns = [
  {
    header: 'Lista de Produtos',
    accessor: 'product',
  },
  {
    header: 'Quantidade',
    accessor: 'actions',
    render: () => <QuantityButton />,
  },
];

export const ListProducts = ({ productsEntry }: Props): ReactElement => {
  const data = productsEntry.map((product) => ({
    product: product.name,
    quantity: <QuantityButton />,
  }));
  return (
    <ContainerListProducts>
      <TableComponent columns={columns} data={data} />
    </ContainerListProducts>
  );
};
