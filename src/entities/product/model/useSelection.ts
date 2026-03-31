import { useState, useMemo, useCallback } from 'react';
import type { Product } from '../types.ts';

export function useSelection(data: Product[]) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const pageIds = useMemo(() => data.map((p) => p.id), [data]);

  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (pageIds.every((id) => prev.has(id))) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }, [pageIds]);

  const toggleOne = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { selectedIds, allPageSelected, toggleAll, toggleOne };
}
