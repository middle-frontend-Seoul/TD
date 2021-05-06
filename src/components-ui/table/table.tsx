import React from 'react';
import cn from 'classnames';

import './table.scss';

type TableSize = 'small' | 'medium';

export type TablePagination = {
  page: number;
  pages?: number;
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
  dataSource = [],
  size = 'medium',
  pagination,
}: ITableProps<T>): JSX.Element {
  const { page, pages, handleNext, handlePrev } = pagination || {};

  const handleOnNextPage = () => {
    if (!pages && handleNext) {
      handleNext();
    } else if (Number(page) < Number(pages) && handleNext) {
      handleNext();
    }
  };

  const handleOnPrevPage = () => {
    if (Number(page) > 1 && handlePrev) {
      handlePrev();
    }
  };

  return (
    <div className={className}>
      <table className="table">
        <thead>
          <tr>
            {columns.map(({ key, align, width, minWidth, title }) => {
              const headerCellClasses = cn(
                'table__header-cell',
                `table__header-cell_size-${size}`,
                `table__cell_align-${align || 'left'}`
              );
              return (
                <th
                  key={key}
                  className={headerCellClasses}
                  style={{
                    width,
                    minWidth,
                  }}
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((rowData) => (
            <tr
              key={
                typeof rowKey === 'string'
                  ? `${rowData[rowKey]}`
                  : rowKey(rowData)
              }
            >
              {columns.map(
                ({ key, dataIndex, align, width, minWidth, render }) => {
                  const bodyCellClasses = cn(
                    'table__body-cell',
                    `table__body-cell_size-${size}`,
                    `table__cell_align-${align || 'left'}`
                  );
                  return (
                    <td
                      key={key}
                      className={bodyCellClasses}
                      style={{
                        width,
                        minWidth,
                      }}
                    >
                      {render
                        ? render(rowData[dataIndex], rowData)
                        : rowData[dataIndex]}
                    </td>
                  );
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && ( // TODO - отдельный component-ui
        <div className="table__pagination">
          <div className={`pagination pagination_size-${size}`}>
            <span
              className={`pagination__arrow pagination__arrow_size-${size}`}
              onClick={handleOnPrevPage}
              onKeyDown={handleOnPrevPage}
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
              onClick={handleOnNextPage}
              onKeyDown={handleOnNextPage}
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
}
