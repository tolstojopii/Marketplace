import styles from './Pagination.module.css';

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push('...');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`gap-${i}`} className={styles.gap}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
            onClick={() => onChange(p)}
            aria-label={`Страница ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      
    </nav>
  );
}

export default Pagination;