import { useState } from 'react';
import styles from './ProductCard.module.css';



function ProductCard({ product, onAddToCart }) {
  const { name, price, image, rating, seller } = product;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <span className={styles.productEmoji}>{image}</span>
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={handleFavorite}
        >
          {isFavorite ? '❤️' : '♡'}
        </button>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.productMeta}>
          <span className={styles.productRating}>⭐ {rating}</span>
          <span className={styles.productSeller}>👤 {seller}</span>
        </div>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>{price.toLocaleString()} ₽</span>
          <button 
            className={styles.addToCart}
            onClick={onAddToCart}
          >
            + В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;