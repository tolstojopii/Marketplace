import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import ProductToolbar from "../ProductToolbar/ProductToolbar";
import styles from "./ProductGrid.module.css";

function ProductsGrid({ categorie }) {
  const [sort, setSort] = useState("default");

  const filters = {
    ...(categorie ? { category: categorie } : { popular: true }),
    ...(sort !== "default" ? { sort } : {}),
  };

  const { data: products = [], isLoading, isError, refetch } = useProducts(filters);

  return (
    <section className={styles.productsSection} id="products">
      <h2 className={styles.sectionTitle}>
        {categorie || 'Популярные товары'}
      </h2>
      <p className={styles.sectionSubtitle}>
        {categorie ? 'Товары в категории' : 'То, что выбирают чаще всего'}
      </p>

      <ProductToolbar sort={sort} onSortChange={setSort} />

      {isLoading && (
        <div className={styles.productsGrid}>
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className={styles.errorBox}>
          <p>Не удалось загрузить товары</p>
          <button onClick={() => refetch()} className={styles.retryBtn}>
            Повторить
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className={styles.productsGrid}>
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductsGrid;