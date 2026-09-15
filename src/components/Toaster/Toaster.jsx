import useToastStore from '../../store/toastStore';
import styles from './Toaster.module.css';

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles.toast} ${styles[t.type]}`}
          role="status"
          onClick={() => dismiss(t.id)}
        >
          <span className={styles.icon}>{ICONS[t.type]}</span>
          <span className={styles.message}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export default Toaster;