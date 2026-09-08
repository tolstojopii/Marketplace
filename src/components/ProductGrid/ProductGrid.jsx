import { products } from "../../data/products";
import styles from "./ProductGrid.module.css";

function ProductsGrid({ categorie }) {
  const filteredProducts = categorie
    ? products.filter((prod) => prod.category === categorie)
    : products.filter((prod) => prod.isPopular === true);
  return (
    <section className={styles.productsSection} id="products">
      <h2 className={styles.sectionTitle}>Популярные товары</h2>
      <p className={styles.sectionSubtitle}>То, что выбирают чаще всего</p>
      <div className={styles.productsGrid}>
        {filteredProducts.map((prod) => (
          <div key={prod.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={prod.image} alt={prod.name} className={styles.image} />
            </div>
            <h3>{prod.name}</h3>
            <p>{prod.price} ₽</p>
            <p>{prod.rating}</p>
            <p>{prod.seller}</p>
            <button className={styles.addToCart}>Добавить</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;
