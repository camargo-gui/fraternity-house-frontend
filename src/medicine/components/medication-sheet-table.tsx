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
      header: 'Forma farmacêutica',
      accessor: 'pharmaceuticalForm',
    },
    {
      header: 'Nome farmacológico',
      accessor: 'pharmacologicalName',
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
      header: 'Data de início',
      accessor: 'startDate',
    },
    {
      header: 'Data de término',
      accessor: 'endDate',
    },
  ];

  const data = [
    {
      medicine: 'Paracetamol',
      resident: 'João',
      pharmaceuticalForm: 'Comprimido',
      pharmacologicalName: 'Paracetamol',
      dosage: '25mg',
      firstHour: '08:00',
      frequency: '8/8',
      startDate: '01/01/2021',
      endDate: '07/01/2021',
    },
    {
      medicine: 'Dipirona',
      resident: 'Maria',
      pharmaceuticalForm: 'Comprimido',
      pharmacologicalName: 'Dipirona',
      dosage: '50mg',
      firstHour: '08:00',
      frequency: '8/8',
      startDate: '01/01/2021',
      endDate: '07/01/2021',
    },
  ];

  return <TableComponent columns={columns} data={data} />;
};
