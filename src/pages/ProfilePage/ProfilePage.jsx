import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import styles from "./ProfilePage.module.css";
import { useCartActions, useCartItems } from "../../hooks/useUnifiedCart";
import { useFavoriteItems, useFavoriteToggle } from "../../hooks/useUnifiedFavorites";
import { Star, User } from "../../assets/image";

function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const favorites = useFavoriteItems();
  const toggleFavorite = useFavoriteToggle();
  const cartItems = useCartItems();
  const { add: addToCart } = useCartActions();

  // заглушки 
  const orders = [
    { id: "ORD-1001", date: "12.03.2026", total: 157395, status: "Доставлен" },
    { id: "ORD-1002", date: "18.03.2026", total: 12990, status: "В пути" },
    {
      id: "ORD-1003",
      date: "01.04.2026",
      total: 45999,
      status: "Обрабатывается",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const statusColor = (status) => {
    if (status === "Доставлен") return styles.statusGreen;
    if (status === "В пути") return styles.statusBlue;
    return styles.statusOrange;
  };

  if (!user) {
    return (
      <div className={styles.emptyState}>
        <h2>Вы не авторизованы</h2>
        <p>Войдите в аккаунт, чтобы открыть личный кабинет.</p>
        <button onClick={() => navigate("/auth")} className={styles.primaryBtn}>
          Войти
        </button>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>
              {user.full_name?.[0]?.toUpperCase() || "U"}
            </div>
            <h3 className={styles.userName}>{user.full_name}</h3>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <nav className={styles.menu}>
            <button
              className={`${styles.menuItem} ${
                activeTab === "profile" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <p>Профиль</p>
            </button>
            <button
              className={`${styles.menuItem} ${
                activeTab === "orders" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <p>Мои заказы</p>
            </button>
            <button
              className={`${styles.menuItem} ${
                activeTab === "favorites" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <p>Избранное</p>
              {favorites.length > 0 && (
                <span className={styles.menuBadge}>{favorites.length}</span>
              )}
            </button>
            <button
              className={`${styles.menuItem} ${
                activeTab === "settings" ? styles.menuItemActive : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <p>Настройки</p>
            </button>
          </nav>

          <button className={styles.logoutBtn} onClick={handleLogout}>
            Выйти из аккаунта
          </button>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/")}
          >
            Вернуться на главную
          </button>
        </aside>

        <main className={styles.content}>
          {activeTab === "profile" && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Личные данные</h2>
              <p className={styles.sectionSubtitle}>
                Информация о вашем аккаунте
              </p>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>Имя</span>
                  <span className={styles.infoValue}>{user.full_name}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>Статус</span>
                  <span
                    className={`${styles.infoValue} ${styles.statusActive}`}
                  >
                    Активен
                  </span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>Всего заказов</span>
                  <span className={styles.infoValue}>{orders.length}</span>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div>
                    <div className={styles.statValue}>{orders.length}</div>
                    <div className={styles.statLabel}>Заказов</div>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div>
                    <div className={styles.statValue}>{favorites.length}</div>
                    <div className={styles.statLabel}>В избранном</div>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div>
                    <div className={styles.statValue}>
                      {totalSpent.toLocaleString()} ₽
                    </div>
                    <div className={styles.statLabel}>Потрачено</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "orders" && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Мои заказы</h2>
              <p className={styles.sectionSubtitle}>История ваших покупок</p>

              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderLeft}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderDate}>{order.date}</span>
                    </div>
                    <div className={styles.orderRight}>
                      <span className={styles.orderTotal}>
                        {order.total.toLocaleString()} ₽
                      </span>
                      <span
                        className={`${styles.orderStatus} ${statusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "favorites" && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Избранное</h2>
              <p className={styles.sectionSubtitle}>
                Товары, которые вы отметили
              </p>

              {favorites.length === 0 ? (
                <div className={styles.emptyBox}>
                  <span className={styles.emptyIcon}>💔</span>
                  <p>Пока нет избранных товаров</p>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => navigate("/")}
                  >
                    Перейти к покупкам
                  </button>
                </div>
              ) : (
                <div className={styles.favoritesList}>
                  {favorites.map((item) => (
                    <div key={item.product_key} className={styles.favoriteItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.favoriteImage}
                      />
                      <div className={styles.favoriteInfo}>
                        <h3 className={styles.favoriteName}>{item.name}</h3>
                        <div className={styles.favoriteMeta}>
                          <span>
                            <Star /> {item.rating}
                          </span>
                          <span>
                            <User /> {item.seller}
                          </span>
                        </div>
                        <div className={styles.favoritePrice}>
                          {item.price.toLocaleString()} ₽
                        </div>
                      </div>
                      <div className={styles.favoriteActions}>
                        <button
                          className={styles.cartAddBtn}
                          onClick={() => addToCart(item, 1)}
                        >
                          В корзину
                        </button>
                        <button
                          className={styles.removeFavoriteBtn}
                          onClick={() => toggleFavorite(item)}
                          aria-label="Убрать из избранного"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === "settings" && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Настройки</h2>
              <p className={styles.sectionSubtitle}>Управление аккаунтом</p>

              <form
                className={styles.form}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className={styles.inputGroup}>
                  <label>Имя</label>
                  <input
                    type="text"
                    defaultValue={user.full_name}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Новый пароль</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={styles.input}
                  />
                </div>
                <button type="submit" className={styles.primaryBtn}>
                  Сохранить изменения
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;