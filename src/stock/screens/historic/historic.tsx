import React from 'react';
import { type ReactElement, useState, useContext, useEffect } from 'react';
import { type Movimentation } from '../../entities/historic';
import { ApplicationContext } from '../../../application-context';
import { ObjectionProductService } from '../../services/objection/objection-product-service';
import { noop } from 'lodash';
import TableComponent from '../../../common/components/table/table';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import { FaEye } from 'react-icons/fa';
import { ViewModal } from '../../../common/components/view-modal/view-modal';
import { MovimentationTable } from './movimentation-table';

export const HistoricScreen = (): ReactElement => {
  const columns = [
    {
      header: 'Data',
      accessor: 'created_at',
    },
    {
      header: 'Funcionário',
      accessor: 'employee_name',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Ações',
      accessor: 'action',
      render: (row: Movimentation) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TransparentButton
            onClick={() => {
              setDetailedHistoric(row);
            }}
            leadingIcon={<FaEye color="#002b5e" />}
          />
        </div>
      ),
    },
  ];

  const [historic, setHistoric] = useState<Movimentation[]>([]);
  const [detailedHistoric, setDetailedHistoric] =
    useState<Movimentation | null>(null);
  const { httpClient } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchHistoric = async (): Promise<void> => {
      const response = await new ObjectionProductService().getMovimentations(
        httpClient,
      );
      setHistoric(response.map((res) => res.toDomain()));
    };
    fetchHistoric().catch(noop);
  }, [httpClient]);

  return (
    <>
      {detailedHistoric && (
        <ViewModal
          show={true}
          onHide={() => {
            setDetailedHistoric(null);
          }}
          title="Movimentação detalhada"
          children={<MovimentationTable movimentation={detailedHistoric} />}
          size={'lg'}
        />
      )}
      <TableComponent columns={columns} data={historic} showEmptyTable={true} />
    </>
  );
};
