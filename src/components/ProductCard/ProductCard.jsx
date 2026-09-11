import { Heart, Star, User } from "../../assets/image";
import styles from "./ProductCard.module.css";
import { useCartActions } from "../../hooks/useUnifiedCart";
import {
  useFavoriteToggle,
  useIsFavorite,
} from "../../hooks/useUnifiedFavorites";

function ProductCard({ product }) {
  const { name, price, image, rating, seller } = product;
  const isFavorite = useIsFavorite(product);
  const toggleFavorite = useFavoriteToggle();
  const { add } = useCartActions();

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    add(product, 1);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={image} alt={name} className={styles.image} />
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={handleFavorite}
        >
          <Heart
            fill={isFavorite ? "red" : "none"}
            stroke={isFavorite ? "red" : "currentColor"}
          />
        </button>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <div className={styles.productMeta}>
          <span className={styles.productRating}>
            <Star /> {rating}
          </span>
          <span className={styles.productSeller}>
            <User /> {seller}
          </span>
        </div>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>
            {price.toLocaleString()} ₽
          </span>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
