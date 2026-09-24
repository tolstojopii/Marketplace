import styles from "./AuthPage.module.css";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import useToastStore from "../../store/toastStore";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToastStore();

  const login = useAuthStore((state) => state.login);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    if (!isLogin && (!fullName || fullName.length < 2)) {
      setError("Имя должно содержать минимум 2 символа");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } else {
        const { registerUser } = await import("../../api/auth");
        const res = await registerUser({
          full_name: fullName,
          email,
          password,
        });

        if (res.success) {
          await login(email, password);
          navigate("/");
        }
      }
    } catch (err) {
      const msg = err.message || "Что-то пошло не так";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          Вернуться
        </button>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Имя</label>
              <input
                type="text"
                placeholder="Введите имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}

        {isLogin ? (
          <div className={styles.register} onClick={toggleMode}>
            <p>Нет аккаунта? </p>
            <p className={styles.regBtn}>Зарегистрироваться</p>
          </div>
        ) : (
          <div className={styles.register} onClick={toggleMode}>
            <p>Уже есть аккаунт?</p>
            <p className={styles.regBtn}>Войти</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
