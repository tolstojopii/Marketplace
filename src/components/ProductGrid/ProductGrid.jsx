import { products } from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";
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
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;