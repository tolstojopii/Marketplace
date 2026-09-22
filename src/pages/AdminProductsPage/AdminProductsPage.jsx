import { useNavigate } from 'react-router-dom';
import styles from './AdminProductsPage.module.css';

function AdminProductsPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Управление товарами</h1>
        <button
          className={styles.createBtn}
          onClick={() => navigate('/admin/products/new')}
        >
           Новый товар
        </button>
      </div>
      <p className={styles.hint}>
        Список товаров появится в следующей итерации.
      </p>
    </div>
  );
}

export default AdminProductsPage;