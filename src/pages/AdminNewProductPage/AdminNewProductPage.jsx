import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useCreateProduct } from '../../hooks/useAdminProducts';
import ProductForm from '../../components/ProductForm/ProductForm';
import useToastStore from '../../store/toastStore';
import styles from './AdminNewProductPage.module.css';

function AdminNewProductPage() {
  const navigate = useNavigate();
  const toast = useToastStore();
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const createProduct = useCreateProduct();

  const handleSubmit = async (payload) => {
    try {
      const product = await createProduct.mutateAsync(payload);
      toast.success(`Товар "${product.name}" создан`);
      navigate('/admin/products');
    } catch (err) {
      const msg = err?.errors?.join(', ') || err?.message || 'Не удалось создать товар';
      toast.error(msg);
    }
  };

  if (catLoading) {
    return <div className={styles.container}>Загрузка категорий...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/admin/products')}>
          Назад
        </button>
        <h1 className={styles.title}>Новый товар</h1>
      </div>

      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        isSubmitting={createProduct.isPending}
        submitLabel="Создать товар"
      />
    </div>
  );
}

export default AdminNewProductPage;