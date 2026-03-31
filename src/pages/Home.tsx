import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Text } from '../ui/Text.tsx';
import { Modal } from '../ui/Modal.tsx';
import { ProductTable } from '../components/ProductTable.tsx';
import { AddProductForm } from '../components/AddProductForm.tsx';
import { useProducts } from '../entities/product/api/queries.ts';
import { RefreshIcon, SearchIcon, AddButtonIcon } from '../assets/icons/table-icons.tsx';
import { CloseIcon } from '../assets/icons/auth-icons.tsx';
import type { SortingState, PaginationState } from '@tanstack/react-table';

const PAGE_SIZE = 5;
const DEBOUNCE_MS = 400;

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(inputValue);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [inputValue]);

  const activeSorting = sorting[0];

  const { data, isLoading, isFetching, refetch } = useProducts({
    limit: pagination.pageSize,
    skip: pagination.pageIndex * pagination.pageSize,
    sortBy: activeSorting?.id,
    order: activeSorting ? (activeSorting.desc ? 'desc' : 'asc') : undefined,
    q: debouncedSearch || undefined,
  });

  const clearSearch = () => {
    setInputValue('');
    setDebouncedSearch('');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleAddProduct = useCallback(() => {
    setIsModalOpen(false);
    toast.success('Товар успешно добавлен');
  }, []);

  return (
    <div className="container">
      <div className="container__home">
        <div className="header">
          <Text className="header__title">Товары</Text>
          <div className="input-block">
            <SearchIcon size={24} />
            <input
              type="text"
              placeholder="Поиск"
              maxLength={100}
              name="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {inputValue && <CloseIcon size={20} onClick={clearSearch} />}
          </div>
          <div></div>
        </div>

        <div className="table-block">
          <div className="table-toolbar">
            <Text className="toolbar__title">Все позиции</Text>
            <div className="table-toolbar__actions">
              <button className="refresh-btn" onClick={() => refetch()} type="button">
                <RefreshIcon size={22} />
              </button>
              <button className="add-btn" type="button" onClick={() => setIsModalOpen(true)}>
                <AddButtonIcon />
                <span>Добавить</span>
              </button>
            </div>
          </div>

          <ProductTable
            data={data?.products ?? []}
            total={data?.total ?? 0}
            sorting={sorting}
            onSortingChange={setSorting}
            pagination={pagination}
            onPaginationChange={setPagination}
            isLoading={isLoading || isFetching}
          />
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Добавить товар">
        <AddProductForm onSuccess={handleAddProduct} />
      </Modal>
    </div>
  );
};
