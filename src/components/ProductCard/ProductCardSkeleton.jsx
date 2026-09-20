import Skeleton from '../Skeleton/Skeleton'
import styles from './ProductCard.module.css'

function ProductCardSkeleton() {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <Skeleton width="100%" height="100%" borderRadius={0} />
      </div>

      <div className={styles.productInfo}>
        <Skeleton width="80%" height={14} />

        <div className={styles.productMeta}>
          <Skeleton width={40} height={12} />
          <Skeleton width={60} height={12} />
        </div>

        <div className={styles.productFooter}>
          <Skeleton width={70} height={16} />
          <Skeleton width={80} height={28} borderRadius={8} />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;