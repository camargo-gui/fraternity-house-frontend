import React, { type ReactElement } from 'react';
import TableComponent from '../../../../../common/components/table/table';
import { TransparentButton } from '../../../../components/medicine-table.styles';
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface MedicationRecord {
  id?: number;
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
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

export const MedicationSheetTable = ({
  records,
  handleEdit,
  handleDelete,
}: MedicationSheetTableProps): ReactElement => {
  const columns = [
    { header: 'Morador', accessor: 'resident' },
    { header: 'Medicamento', accessor: 'medicine' },
    { header: 'Horário', accessor: 'frequency' },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row: MedicationRecord) => (
        <div>
          <TransparentButton
            onClick={() => {
              handleEdit(Number(row.id));
            }}
            leadingIcon={<FaEdit color="#002b5e" />}
          />
          <TransparentButton
            onClick={() => {
              handleDelete(Number(row.id));
            }}
            leadingIcon={<FaTrash color="red" />}
          />
        </div>
      ),
    },
  ];

  const rec = records.map((record, index) => {
    return {
      ...records,
      medicine: record.medicine,
      resident: record.resident,
      frequency: `de ${record.frequency} em ${record.frequency}h`,
    };
  });

  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <TableComponent columns={columns} data={rec} showEmptyTable={true} />
    </div>
  );
};
