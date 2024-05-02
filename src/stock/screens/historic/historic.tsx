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
import LoadingSpinner from '../../../common/components/loading-spinner/loading-spinner';
import { FormInput } from '../../../common/components/form-input/form-input';

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

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filteredHistoric, setFilteredHistoric] = useState<Movimentation[]>([]);
  const [historic, setHistoric] = useState<Movimentation[]>([]);
  const [detailedHistoric, setDetailedHistoric] =
    useState<Movimentation | null>(null);
  const { httpClient } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchHistoric = async (): Promise<void> => {
      setIsLoading(true);
      const response = await new ObjectionProductService().getMovimentations(
        httpClient,
      );
      setHistoric(response.map((res) => res.toDomain()));
      setFilteredHistoric(response.map((res) => res.toDomain()));
      setIsLoading(false);
    };
    fetchHistoric().catch(noop);
  }, []);

  useEffect(() => {
    if (filter === 'all' || filter === '') {
      setFilteredHistoric(historic);
      return;
    }
    const filtered = historic.filter((product) => product.type === filter);
    setFilteredHistoric(filtered);
  }, [filter, historic]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <FormInput
        id="type-filter"
        style={{ width: '20%', marginBottom: '16px' }}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setFilter(target.value);
        }}
        type="select"
        options={[
          {
            value: 'all',
            label: 'Todos',
          },
          {
            value: 'Entrada',
            label: 'Entrada',
          },
          {
            value: 'Saída',
            label: 'Saída',
          },
        ]}
      />
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
      <TableComponent
        columns={columns}
        data={filteredHistoric}
        showEmptyTable={true}
      />
    </>
  );
};
