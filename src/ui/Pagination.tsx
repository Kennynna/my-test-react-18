const PAGES_PER_GROUP = 5;

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  from: number;
  to: number;
  total: number;
}

export const Pagination = ({
  pageIndex,
  pageCount,
  onPageChange,
  from,
  to,
  total,
}: PaginationProps) => {
  const groupIndex = Math.floor(pageIndex / PAGES_PER_GROUP);
  const groupStart = groupIndex * PAGES_PER_GROUP;
  const groupEnd = Math.min(groupStart + PAGES_PER_GROUP, pageCount);

  const canPrevGroup = groupIndex > 0;
  const canNextGroup = groupStart + PAGES_PER_GROUP < pageCount;

  const pages: number[] = [];
  for (let i = groupStart; i < groupEnd; i++) pages.push(i);

  return (
    <div className="pagination">
      <span className="pagination__info">
        Показано <span>{from}-{to} </span> из <span>{total}</span>
      </span>
      <div className="pagination__controls">
        <button
          disabled={!canPrevGroup}
          onClick={() => onPageChange(groupStart - PAGES_PER_GROUP)}
          className="pagination__arrow"
        >
          &lt;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={pageIndex === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          disabled={!canNextGroup}
          onClick={() => onPageChange(groupStart + PAGES_PER_GROUP)}
          className="pagination__arrow"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
