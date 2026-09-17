# MarketPlace - платформа для онлайн-торговли

> Интернет-магазин с аутентификацией, категориями товаров и корзиной.

---

## О проекте

Full-stack маркетплейс с корзиной, избранным, авторизацией и каталогом товаров по категориям. Работает как для авторизованных пользователей (данные хранятся на сервере), так и для гостей (данные в localStorage).

### Возможности
**Авторизация и регистрация** - JWT-токен, bcrypt-хеширование пароля

**Каталог товаров** фильтрация по категориям, поиск, «популярные»

**Корзина** - работает и для гостей (localStorage), и для авторизованных (БД), с оптимистичными обновлениями

**Избранное** - то же самое: unified-логика для гостей и пользователей

**Личный кабинет** -профиль, заказы (заглушка), избранное, настройки

**Тосты** - глобальные уведомления через Zustand

Проект состоит из двух частей:

- **Сервер** (backend) - Node.js + Express + PostgreSQL.
- **Клиент** (frontend) - React + React Router + Zustand.

---

## Стек технологий

### Backend

- **Node.js** + **Express** - создание REST API.
- **PostgreSQL** - база данных.
- **pg** - драйвер для работы с PostgreSQL.
- **bcryptjs** - хеширование паролей.
- **jsonwebtoken** - генерация и проверка JWT.
- **express-validator** - валидация данных.
- **cors** - настройка CORS.
- **dotenv** - управление переменными окружения.

### Frontend

- **React** (v18+) - пользовательский интерфейс.
- **React Router** - маршрутизация.
- **React query** - серверное состояние, кещ, мутации
- **Zustand** - управление состоянием (аутентификация).
- **Axios** - HTTP-запросы к серверу.
- **CSS Modules** - стилизация компонентов.

---
## Установка и запуск

### Клонирование репозитория

```bash
git clone <url-репозитория>
cd marketplace
```

### Настройка бэкэнда

```bash
cd server
npm install
```

### создать .env в папке server

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marketplace_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_key

### Создать бд PostgeSQL и выполнить SQL-скрипт для создания таблицы

**users**	- Пользователи (full_name, email, password)
**categories** -	Категории товаров (name, slug)
**products** - Товары (name, price, image, rating, seller, category_id, is_popular)
**cart_items** -	Корзина: (user_id, product_key) UNIQUE, product_data jsonb, quantity
**favorites**	- Избранное: (user_id, product_key) UNIQUE, product_data jsonb


### полезные команды
npm run migrate:up       *Применить миграции*
npm run migrate:down     *Откатить последнюю миграцию*
npm run migrate:create   *Создать новую миграцию*
npm run seed             *Загрузить товары из seeds/products.json*


### запустить сервер в папке server

```bash
cd server
npm run dev
```

### запустить и установить зависимости frontend

```bash
npm i
npm run dev
```

### Функционал(не конечный)

Категории - при клике на категорию в ProductGrid отображаются только товары этой категории.

Аутентификация - JWT-токен хранится в localStorage, используется в интерсепторах Axios.

Защищённый маршрут - данные пользователя загружаются при монтировании App

### Будущие улучшения

- Интеграция TypeScript
- Админ-панель для управления товарами и пользователями
- Фильтрация и сортировка товаров
- Добавление логирования
- Пагинация

Автор: Игорь
