import styles from './CartPage.module.css';

import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useCartItems, useCartActions, useCartTotal } from '../../hooks/useUnifiedCart'

function CartPage() {
  const items = useCartItems();
const { setQuantity, remove, clear } = useCartActions();
const { count: totalItems, price: totalPrice } = useCartTotal();
const { user } = useAuthStore();
const navigate = useNavigate();

  

  const handleCheckout = () => {
  if (!user) {
    alert('Пожалуйста, войдите в аккаунт для оформления заказа.');
    navigate('/auth');
    return;
  }
  alert(`Заказ на сумму ${totalPrice} ₽ успешно оформлен!`);
  clear();
};

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары, чтобы оформить заказ.</p>
        <button className={styles.shopBtn} onClick={() => navigate('/')}>
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.title}>Корзина</h2>
      <div className={styles.cartList}>
        {items.map((item) => (
  <div key={item.product_key} className={styles.cartItem}>
    <img src={item.image} alt={item.name} className={styles.itemImage} />
    <div className={styles.itemInfo}>
      <h3 className={styles.itemName}>{item.name}</h3>
      <p className={styles.itemPrice}>{item.price} ₽</p>
    </div>
    <div className={styles.quantityControl}>
      <button onClick={() => setQuantity(item.product_key, item.quantity - 1)}>−</button>
      <span>{item.quantity}</span>
      <button onClick={() => setQuantity(item.product_key, item.quantity + 1)}>+</button>
    </div>
    <button onClick={() => remove(item.product_key)}>✕</button>
  </div>
))}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>Итого товаров:</span>
          <span>{totalItems} шт.</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Общая сумма:</span>
          <span className={styles.totalPrice}>{totalPrice} ₽</span>
        </div>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default CartPage;