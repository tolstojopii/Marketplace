import styles from "./Header.module.css";
import { Shop, ShoppingBasket } from "../../assets/image";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useCartTotal } from "../../hooks/useUnifiedCart";

function Header() {
  const { user, logout } = useAuthStore();
  const { count: totalItems } = useCartTotal();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div
          className={styles.logo}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Shop />
          <span className={styles.logoText}>MarketPlace</span>
        </div>

        <nav className={styles.nav}>
          <a href="#categories">Категории</a>
          <a href="#products">Товары</a>
          <a href="#features">Преимущества</a>
        </nav>

        <div className={styles.headerActions}>
          <Link to="/cart" className={styles.cartLink}>
            <button className={styles.cartBtn}>
              <ShoppingBasket />
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </button>
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/products" className={styles.adminLink}>
              Админка
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className={styles.profileLink}>
                <span className={styles.userName}>{user.full_name}</span>
              </Link>
              <button className={styles.logOutBtn} onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <button onClick={handleLoginClick} className={styles.loginBtn}>
              Войти в аккаунт
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
