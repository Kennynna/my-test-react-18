import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { Product } from '../types.ts';
import { ProductNameCell, RatingCell, PriceCell, ActionsCell } from '../ui/index.ts';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    selectedIds: Set<number>;
    allPageSelected: boolean;
    toggleOne: (id: number) => void;
    toggleAll: () => void;
  }
}

export const productColumns: ColumnDef<Product>[] = [
  {
    id: 'select',
    size: 48,
    enableSorting: false,
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.options.meta!.allPageSelected}
        onChange={table.options.meta!.toggleAll}
      />
    ),
    cell: ({ row, table }) => (
      <input
        type="checkbox"
        checked={table.options.meta!.selectedIds.has(row.original.id)}
        onChange={() => table.options.meta!.toggleOne(row.original.id)}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Наименование',
    enableSorting: true,
    cell: ({ row }) => (
      <ProductNameCell
        title={row.original.title}
        category={row.original.category}
        thumbnail={row.original.thumbnail}
      />
    ),
  },
  {
    accessorKey: 'brand',
    header: 'Вендор',
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="cell-vendor">{(getValue() as string) || '—'}</span>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'Артикул',
    size: 150,
    enableSorting: false,
  },
  {
    accessorKey: 'rating',
    header: 'Оценка',
    size: 100,
    enableSorting: true,
    cell: ({ getValue }) => <RatingCell value={getValue() as number} />,
  },
  {
    accessorKey: 'price',
    header: 'Цена, ₽',
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <PriceCell value={getValue() as number} />,
  },
  {
    id: 'actions',
    header: '',
    size: 110,
    enableSorting: false,
    cell: () => <ActionsCell />,
  },
];
