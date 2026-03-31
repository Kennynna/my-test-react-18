interface ProductNameCellProps {
  title: string;
  category: string;
  thumbnail: string;
}

export const ProductNameCell = ({ title, category, thumbnail }: ProductNameCellProps) => (
  <div className="cell-product-name">
    <img className="cell-product-name__img" src={thumbnail} alt={title} />
    <div className="cell-product-name__text">
      <span className="cell-product-name__title">{title}</span>
      <span className="cell-product-name__category">{category}</span>
    </div>
  </div>
);
