import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import ProductToolbar from "../ProductToolbar/ProductToolbar";
import Pagination from "../Pagination/Pagination";
import styles from "./ProductGrid.module.css";

const PAGE_SIZE = 5;

function ProductsGrid({ categorie }) {
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [categorie, sort]);

  const filters = {
    page,
    limit: PAGE_SIZE,
    ...(categorie ? { category: categorie } : { popular: true }),
    ...(sort !== "default" ? { sort } : {}),
  };

  const { data, isLoading, isError, refetch, isFetching } =
    useProducts(filters);
  const products = data?.products ?? [];
  const pagination = data?.pagination;

  return (
    <section className={styles.productsSection} id="products">
      <h2 className={styles.sectionTitle}>
        {categorie || "Популярные товары"}
      </h2>
      <p className={styles.sectionSubtitle}>
        {categorie ? "Товары в категории" : "То, что выбирают чаще всего"}
      </p>

      <ProductToolbar sort={sort} onSortChange={setSort} />

      {isLoading && (
        <div className={styles.productsGrid}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
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

      {!isLoading && !isError && products.length === 0 && (
        <div className={styles.errorBox}>
          <p>Товары не найдены</p>
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <>
          <div
            className={styles.productsGrid}
            style={{
              opacity: isFetching ? 0.5 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onChange={setPage}
            />
          )}
        </>
      )}
    </section>
  );
}

export default ProductsGrid;
