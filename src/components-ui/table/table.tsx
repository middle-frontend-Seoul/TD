import React, { FC } from 'react';

import './table.scss';

type TableSize = 'small' | 'medium';

export type TablePagination = {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
};

export type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  minWidth?: string;
  render?: (value: any, row: any) => JSX.Element;
};

export interface ITableProps {
  className?: string;
  rowKey?: string | ((row: any) => string);
  columns: TableColumn[];
  dataSource?: any[];
  size?: TableSize;
  pagination?: TablePagination;
}

export const Table: FC<ITableProps> = ({
  className,
  rowKey = 'id',
  columns,
  dataSource,
  size = 'medium',
  pagination,
}) => {
  return (
    <div className={className}>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`table__header-cell table__header-cell_size-${size}`}
                style={{
                  textAlign: column.align || 'left',
                  width: column.width,
                  minWidth: column.minWidth,
                }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(dataSource || []).map((rowData) => (
            <tr
              key={
                typeof rowKey === 'string'
                  ? `${rowData[rowKey]}`
                  : rowKey(rowData)
              }
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`table__body-cell table__body-cell_size-${size}`}
                  style={{
                    textAlign: column.align || 'left',
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                >
                  {rowData.render
                    ? rowData.render(rowData[column.dataIndex], rowData)
                    : rowData[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="table__pagination">
          <div className={`pagination pagination_size-${size}`}>
            <div
              className={`pagination__arrow pagination__arrow_size-${size}`}
              onClick={pagination.handlePrev}
              onKeyDown={pagination.handlePrev}
              role="button"
              tabIndex={0}
            >
              &lt;
            </div>
            <div className={`pagination__page pagination__page_size-${size}`}>
              {pagination.page}
            </div>
            <div
              className={`pagination__arrow pagination__arrow_size-${size}`}
              onClick={pagination.handleNext}
              onKeyDown={pagination.handleNext}
              role="button"
              tabIndex={0}
            >
              &gt;
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
