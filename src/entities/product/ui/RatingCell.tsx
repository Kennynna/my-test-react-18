const RATING_THRESHOLD = 3.5;

interface RatingCellProps {
  value: number;
}

export const RatingCell = ({ value }: RatingCellProps) => (
  <span className={value < RATING_THRESHOLD ? 'cell-rating--low' : ''}>
    {value.toFixed(1)}/5
  </span>
);
