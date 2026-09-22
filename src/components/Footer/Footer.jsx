import { Message, Phone, Shop } from "../../assets/image";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3><Shop className={styles.icon}/> MarketPlace</h3>
          <p>Покупайте с удовольствием, продавайте с выгодой.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Покупателям</h4>
          <a href="#">Доставка</a>
          <a href="#">Оплата</a>
          <a href="#">Возврат</a>
        </div>
        <div className={styles.footerSection}>
          <h4>Продавцам</h4>
          <a href="#">Регистрация</a>
          <a href="#">Правила</a>
          <a href="#">Тарифы</a>
        </div>
        <div className={styles.footerSection}>
          <h4>Контакты</h4>
          <p><Message className={styles.icon}/> support@marketplace.ru</p>
          <p><Phone className={styles.icon} /> 8 (800) 555-35-35</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2026 MarketPlace. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
