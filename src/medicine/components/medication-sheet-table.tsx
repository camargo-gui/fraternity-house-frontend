import { type ReactElement } from 'react';
import TableComponent from '../../common/components/table/table';
import React from 'react';

export const MedicationSheetTable = (): ReactElement => {
  const columns = [
    {
      header: 'Morador',
      accessor: 'resident',
    },
    {
      header: 'Medicamento',
      accessor: 'medicine',
    },
    {
      header: 'Dosagem',
      accessor: 'dosage',
    },
    {
      header: 'Primeiro horário',
      accessor: 'firstHour',
    },
    {
      header: 'Frequência',
      accessor: 'frequency',
    },
    {
      header: 'Periodo',
      accessor: 'period',
    },
  ];

  const data = [
    {
      medicine: 'Paracetamol',
      resident: 'João',
      dosage: '25mg',
      firstHour: '08:00',
      frequency: '8/8',
      period: '7 dias',
    },
    {
      medicine: 'Dipirona',
      resident: 'Maria',
      dosage: '50mg',
      firstHour: '08:00',
      frequency: '8/8',
      period: '7 dias',
    },
  ];

  return <TableComponent columns={columns} data={data} />;
};
