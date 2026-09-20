import styles from "./ProductToolbar.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Сначала дешёвые" },
  { value: "price_desc", label: "Сначала дорогие" },
  { value: "rating_desc", label: "По рейтингу" },
  { value: "name_asc", label: "По алфавиту" },
];

function ProductToolbar({ sort, onSortChange }) {
  return (
    <div className={styles.toolbar}>
      <select
        className={styles.sortSelect}
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductToolbar;
