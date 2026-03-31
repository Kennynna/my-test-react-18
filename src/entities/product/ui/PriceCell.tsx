interface PriceCellProps {
  value: number;
}

export const PriceCell = ({ value }: PriceCellProps) => {
  const formatted = value.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const commaIndex = formatted.indexOf(',');

  if (commaIndex === -1) {
    return <span className="cell-price">{formatted}</span>;
  }

  return (
    <span className="cell-price">
      {formatted.slice(0, commaIndex)}
      <span style={{ color: '#999999' }}>{formatted.slice(commaIndex)}</span>
    </span>
  );
};
