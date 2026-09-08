import styles from "./Features.module.css";

import { Security, Reverse, Truck, Message } from "../../assets/image";

const features = [
  {
    id: 1,
    icon: <Truck/>,
    title: "Бесплатная доставка",
    desc: "При заказе от 3000 ₽",
  },
  {
    id: 2,
    icon: <Security/>,
    title: "Безопасная оплата",
    desc: "Защита каждой транзакции",
  },
  {
    id: 3,
    icon: <Reverse/>,
    title: "Простой возврат",
    desc: "Вернем деньги в течение 7 дней",
  },
  { id: 4, icon: <Message/>, title: "Поддержка 24/7", desc: "Всегда готовы помочь" },
];

function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.featuresGrid}>
        {features.map((f) => (
          <div key={f.id} className={styles.featureItem}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
