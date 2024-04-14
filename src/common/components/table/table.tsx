/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { type RootState } from '../../../redux/store/store';
import LoadingSpinner from '../loading-spinner/loading-spinner';

interface TableColumn {
  header: string;
  accessor: string | ((row: any) => any);
  render?: (row: any) => React.ReactNode;
}

interface TableComponentProps {
  columns: TableColumn[];
  data: Array<Record<string, any>>;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const resolveAccessor = (
    row: any,
    accessor: string | ((row: any) => any),
  ): any => {
    if (typeof accessor === 'function') {
      return accessor(row);
    }
    return accessor.split('.').reduce((acc, part) => acc[part], row);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data.length === 0 && !isLoading) {
    return <Alert variant="info">Nenhum item cadastrado</Alert>;
  }

  return (
    <div className="custom-table">
      <Table striped bordered hover responsive className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                if (column.render !== undefined) {
                  return <td key={colIndex}>{column.render(row)}</td>;
                }

                const cellData = resolveAccessor(row, column.accessor);
                const displayValue =
                  typeof cellData === 'object'
                    ? JSON.stringify(cellData)
                    : cellData;
                return <td key={colIndex}>{displayValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
