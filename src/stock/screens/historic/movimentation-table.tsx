import { type ReactElement } from 'react';
import TableComponent from '../../../common/components/table/table';
import { type Movimentation } from '../../entities/historic';

export const MovimentationTable = ({
  movimentation,
}: {
  movimentation: Movimentation;
}): ReactElement => {
  const columns = [
    {
      header: 'Produto',
      accessor: 'name',
    },
    {
      header: 'Quantidade',
      accessor: 'quantity',
    },
    {
      header: 'Unidade de medida',
      accessor: 'measurement',
    },
  ];
  return (
    <TableComponent
      columns={columns}
      data={movimentation.products}
      showEmptyTable={true}
    />
  );
};
