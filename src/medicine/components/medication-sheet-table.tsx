import { type ReactElement } from 'react';
import TableComponent from '../../common/components/table/table';
import { type MedicationSheetBody } from '../entities/medication-sheet-body';
import { FaEye } from 'react-icons/fa';
import { TransparentButton } from './medicine-table.styles';

interface Props {
  medicationSheets: MedicationSheetBody[];
  handleShowPrescriptions: (sheet: MedicationSheetBody) => void;
}

export const MedicationSheetTable = ({
  medicationSheets,
  handleShowPrescriptions,
}: Props): ReactElement => {
  const columns = [
    {
      header: 'Morador',
      accessor: 'Resident.name',
    },
    {
      header: 'Responsável pela ficha',
      accessor: 'Employee.name',
    },
    {
      header: 'Observações',
      accessor: 'observations',
    },
    {
      header: 'Prescrições',
      accessor: 'prescriptions.length',
    },
    {
      header: 'Ver prescrições',
      accessor: 'actions',
      render: (row: MedicationSheetBody) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TransparentButton
            onClick={() => {
              handleShowPrescriptions(row);
            }}
            leadingIcon={<FaEye color="#002b5e" />}
          />
        </div>
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={medicationSheets}
      showEmptyTable={true}
    />
  );
};
