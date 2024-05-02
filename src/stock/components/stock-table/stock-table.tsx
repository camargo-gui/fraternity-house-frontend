import { type ReactElement } from 'react';
import TableComponent from '../../../common/components/table/table';
import { type Product } from '../../entities/product';
import { MeasurementType } from '../../entities/measurement-type';

export const StockTable = ({
  products,
}: {
  products: Product[];
}): ReactElement => {
  const handleProducts = (): Array<{
    name: string;
    quantity: string;
  }> => {
    return products.map((product) => ({
      name: product.name,
      quantity: `${product.quantity} ${MeasurementType[product.measurement as keyof typeof MeasurementType]}`,
    }));
  };
  const colums = [
    {
      header: 'Produto',
      accessor: 'name',
    },
    {
      header: 'Quantidade',
      accessor: 'quantity',
    },
  ];

  return <TableComponent columns={colums} data={handleProducts()} />;
};
