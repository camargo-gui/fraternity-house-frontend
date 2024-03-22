import TableComponent from '../../common/components/table/table';
import React, { type ReactElement } from 'react';
import type { Medicine } from '../entities/medicine';

export const MedicineTable = ({
  medicines,
}: {
  medicines: Medicine[];
}): ReactElement => {
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Forma farmacêutica',
      accessor: 'pharmaceutical_forms',
    },
    {
      header: 'Nome farmacológico',
      accessor: 'PharmacologicalName.name',
    },
  ];

  return <TableComponent columns={columns} data={medicines} />;
};
