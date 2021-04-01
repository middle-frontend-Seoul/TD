import React from 'react';

import './table.scss';

type TableSize = 'small' | 'medium';

export type TablePagination = {
  page: number;
  handlePrev: () => void;
  handleNext: () => void;
};

export type TableColumn<T> = {
  title: string;
  dataIndex: string;
  key: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  minWidth?: string;
  render?: (value: any, row: T) => JSX.Element;
};

// TODO - типизировать
// например, https://fernandoabolafio.medium.com/generic-table-component-with-react-and-typescript-d849ad9f4c48
export interface ITableProps<T> {
  className?: string;
  rowKey?: string | ((row: T) => string);
  columns: TableColumn<T>[];
  dataSource?: T[];
  size?: TableSize;
  pagination?: TablePagination;
}

export function Table<T extends Record<string, any>>({
  className,
  rowKey = 'id',
  columns,
  dataSource,
  size = 'medium',
  pagination,
}: ITableProps<T>): JSX.Element {
  return (
    <div className={className}>
      <table className="table">
        <thead>
          <tr>
            {columns.map(({ key, align, width, minWidth, title }) => (
              <th
                key={key}
                className={`table__header-cell table__header-cell_size-${size}`}
                style={{
                  textAlign: align || 'left',
                  width,
                  minWidth,
                }}
              >
                {title}
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
                  {column.render
                    ? column.render(rowData[column.dataIndex], rowData)
                    : rowData[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && ( // TODO - отдельный component-ui
        <div className="table__pagination">
          <div className={`pagination pagination_size-${size}`}>
            <span
              className={`pagination__arrow pagination__arrow_size-${size}`}
              onClick={pagination.handlePrev}
              onKeyDown={pagination.handlePrev}
              role="button"
              tabIndex={0}
            >
              &lt;
            </span>
            <span className={`pagination__page pagination__page_size-${size}`}>
              {pagination.page}
            </span>
            <span
              className={`pagination__arrow pagination__arrow_size-${size}`}
              onClick={pagination.handleNext}
              onKeyDown={pagination.handleNext}
              role="button"
              tabIndex={0}
            >
              &gt;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
