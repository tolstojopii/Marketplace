import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

function ProductsGrid({ categorie }) {
  const filters = categorie
    ? { category: categorie }
    : { popular: true };

  const { data: products = [], isLoading, isError, refetch } = useProducts(filters);

  if (isLoading) return <div className={styles.loader}>Загрузка товаров...</div>;
  if (isError) return <button onClick={refetch}>Ошибка, повторить</button>;

  return (
    <section className={styles.productsSection} id="products">
      <h2 className={styles.sectionTitle}>
        {categorie || 'Популярные товары'}
      </h2>
      <p className={styles.sectionSubtitle}>
        {categorie ? 'Товары в категории' : 'То, что выбирают чаще всего'}
      </p>
      <div className={styles.productsGrid}>
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;