import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
import styles from './ProductGrid.module.css';

function ProductGridSkeleton({ count = 10 }) {
  return (
    <div className={styles.productsGrid}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default ProductGridSkeleton;