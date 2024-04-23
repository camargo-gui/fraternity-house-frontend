import React, { type ReactElement } from 'react';
import TableComponent from '../../../../common/components/table/table';
import { TransparentButton } from '../../../components/medicine-table.styles';
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface MedicationRecord {
  resident: string;
  medicineId?: string;
  medicine: string;
  pharmaceuticalForm: string;
  pharmacologicalName: string;
  dosage: string;
  firstHour: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

export const EMPTY_RECORD: MedicationRecord = {
  resident: '',
  medicine: '',
  pharmaceuticalForm: '',
  pharmacologicalName: '',
  dosage: '',
  firstHour: '',
  frequency: '',
  startDate: '',
  endDate: '',
};

interface MedicationSheetTableProps {
  records: MedicationRecord[];
}

export const MedicationSheetTable = ({
  records,
}: MedicationSheetTableProps): ReactElement => {
  const columns = [
    { header: 'Morador', accessor: 'resident' },
    { header: 'Medicamento', accessor: 'medicine' },
    { header: 'Horário', accessor: 'frequency' },
    {
      header: 'Ações',
      accessor: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => (
        <div>
          <TransparentButton
            onClick={() => {}}
            leadingIcon={<FaEdit color="#002b5e" />}
          />

          <TransparentButton
            onClick={() => {}}
            leadingIcon={<FaTrash color="red" />}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <TableComponent columns={columns} data={records} showEmptyTable={true} />
    </div>
  );
};
