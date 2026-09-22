// components/animation/Reveal.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 24,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-y': `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}