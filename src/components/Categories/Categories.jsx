import { Electronics, Clothes, House, Books, Sport, Auto } from '../../assets/image';
import styles from './Categories.module.css';

const categories = [
  { id: 1, name: 'Электроника', icon: <Electronics />, color: 'rgb(39, 12, 114)' },
  { id: 2, name: 'Одежда', icon: <Clothes />, color: '#152777' },
  { id: 3, name: 'Дом и сад', icon: <House />, color: 'rgb(39, 12, 114)' },
  { id: 4, name: 'Книги', icon: <Books />, color: '#152777' },
  { id: 5, name: 'Спорт', icon: <Sport />, color: 'rgb(39, 12, 114)' },
  { id: 6, name: 'Авто', icon: <Auto />, color: '#152777' },
];

function Categories({ select, active }) {
  return (
    <section className={styles.categories} id="categories">
      <div className={styles.header}>
        <div>
          <h2 className={styles.sectionTitle}>Категории</h2>
          <p className={styles.sectionSubtitle}>
            {active ? `Показаны товары: ${active}` : 'Выберите то, что вам нужно'}
          </p>
        </div>

        {active && (
          <button
            className={styles.resetBtn}
            onClick={() => select(active)}
            aria-label="Сбросить фильтр категории"
          >
            ✕ Сбросить
          </button>
        )}
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`${styles.categoryCard} ${
              active === cat.name ? styles.categoryCardActive : ''
            }`}
            style={{ background: cat.color }}
            onClick={() => select(cat.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                select(cat.name);
              }
            }}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryName}>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;