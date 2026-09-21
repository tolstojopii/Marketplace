import { useState } from 'react';
import styles from './ProductForm.module.css';

const INITIAL = {
  name: '',
  price: '',
  image: '',
  rating: 5,
  seller: '',
  category_id: '',
  is_popular: false,
};

function ProductForm({ initialValues, categories, onSubmit, isSubmitting, submitLabel = 'Сохранить' }) {
  const [values, setValues] = useState(initialValues || INITIAL);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name || values.name.trim().length < 2) {
      next.name = 'Минимум 2 символа';
    }
    const priceNum = Number(values.price);
    if (!Number.isInteger(priceNum) || priceNum < 0) {
      next.price = 'Целое неотрицательное число';
    }
    if (!values.image || !values.image.trim()) {
      next.image = 'Укажите путь к картинке';
    }
    if (!values.seller || values.seller.trim().length < 2) {
      next.seller = 'Минимум 2 символа';
    }
    if (!values.category_id) {
      next.category_id = 'Выберите категорию';
    }
    const ratingNum = Number(values.rating);
    if (Number.isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      next.rating = 'От 0 до 5';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: values.name.trim(),
      price: Number(values.price),
      image: values.image.trim(),
      rating: Number(values.rating),
      seller: values.seller.trim(),
      category_id: Number(values.category_id),
      is_popular: Boolean(values.is_popular),
    };
    await onSubmit(payload);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <label className={styles.label}>Название</label>
        <input
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="iPhone 15 Pro"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>Цена, ₽</label>
          <input
            type="number"
            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
            value={values.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="99999"
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Рейтинг (0–5)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className={`${styles.input} ${errors.rating ? styles.inputError : ''}`}
            value={values.rating}
            onChange={(e) => handleChange('rating', e.target.value)}
          />
          {errors.rating && <span className={styles.error}>{errors.rating}</span>}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Путь к картинке</label>
        <input
          className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
          value={values.image}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="/productImage/iphone.png"
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
        {values.image && (
          <div className={styles.preview}>
            <img src={values.image} alt="Превью" />
          </div>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>Продавец</label>
          <input
            className={`${styles.input} ${errors.seller ? styles.inputError : ''}`}
            value={values.seller}
            onChange={(e) => handleChange('seller', e.target.value)}
            placeholder="MobileWorld"
          />
          {errors.seller && <span className={styles.error}>{errors.seller}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Категория</label>
          <select
            className={`${styles.input} ${errors.category_id ? styles.inputError : ''}`}
            value={values.category_id}
            onChange={(e) => handleChange('category_id', e.target.value)}
          >
            <option value="">— выберите —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.category_id && <span className={styles.error}>{errors.category_id}</span>}
        </div>
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={values.is_popular}
          onChange={(e) => handleChange('is_popular', e.target.checked)}
        />
        <span>Популярный товар (показывать на главной)</span>
      </label>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Сохранение...' : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;