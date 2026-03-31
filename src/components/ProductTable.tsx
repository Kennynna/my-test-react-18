import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table';
import type { Product } from '../entities/product/types.ts';
import { productColumns } from '../entities/product/model/columns.tsx';
import { useSelection } from '../entities/product/model/useSelection.ts';
import { Pagination } from '../ui/Pagination.tsx';

interface ProductTableProps {
  data: Product[];
  total: number;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  isLoading: boolean;
}

export const ProductTable = ({
  data,
  total,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
  isLoading,
}: ProductTableProps) => {
  const pageCount = Math.ceil(total / pagination.pageSize);
  const { selectedIds, allPageSelected, toggleAll, toggleOne } = useSelection(data);

  const table = useReactTable({
    data,
    columns: productColumns,
    pageCount,
    state: { sorting, pagination },
    meta: { selectedIds, allPageSelected, toggleOne, toggleAll },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      onSortingChange(next);
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
  });

  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(from + pagination.pageSize - 1, total);

  return (
    <div className="product-table-wrapper">
      {isLoading && (
        <div className="progress-bar">
          <div className="progress-bar__fill" />
        </div>
      )}

      <div className="product-table-scroll">
        <table className="product-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={header.column.getCanSort() ? 'sortable' : ''}
                  >
                    <div className="th-content">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const isSelected = selectedIds.has(row.original.id);
              return (
                <tr key={row.id} className={isSelected ? 'row--selected' : ''}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
            {!isLoading && data.length === 0 && (
              <tr>
                <td colSpan={productColumns.length} className="empty-row">
                  Товары не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        pageIndex={pagination.pageIndex}
        pageCount={pageCount}
        onPageChange={(page) => table.setPageIndex(page)}
        from={from}
        to={to}
        total={total}
      />
    </div>
  );
};
