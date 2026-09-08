import styles from "./Hero.module.css";
import { Speed, Lock, Package } from "../../assets/image";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <span className={styles.heroBadge}>Горячие предложения</span>
          <h1>
            Покупайте и продавайте
            <br />
            <span className={styles.highlight}>с комфортом</span>
          </h1>
          <p className={styles.heroDescription}>
            Тысячи товаров от проверенных продавцов. Лучшие цены, быстрая
            доставка и гарантия качества.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.btnPrimary}>Начать покупки</button>
            <button className={styles.btnSecondary}>Узнать больше</button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Товаров</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12K</span>
              <span className={styles.statLabel}>Продавцов</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Довольных</span>
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={`${styles.heroCard} ${styles.card1}`}>
            <span className={styles.cardEmoji}>
              <Package />
            </span>
            <h3>Бесплатная доставка</h3>
            <p>При заказе от 3000₽</p>
          </div>
          <div className={`${styles.heroCard} ${styles.card2}`}>
            <span className={styles.cardEmoji}>
              <Lock />
            </span>
            <h3>Безопасность</h3>
            <p>Защита каждой сделки</p>
          </div>
          <div className={`${styles.heroCard} ${styles.card3}`}>
            <span className={styles.cardEmoji}>
              <Speed />
            </span>
            <h3>Мгновенно</h3>
            <p>Доставка за 1 день</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
