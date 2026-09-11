# MarketPlace - платформа для онлайн-торговли

> Интернет-магазин с аутентификацией, категориями товаров и корзиной.

---

## О проекте

MarketPlace - это веб-приложение, которое позволяет пользователям:

- просматривать каталог товаров (электроника, одежда, книги, спорт, авто, дом и сад);
- фильтровать товары по категориям;
- добавлять товары в корзину (в реальном времени обновляется счётчик);
- регистрироваться и входить в аккаунт с использованием JWT;
- получать данные о текущем пользователе;
- использовать адаптивный интерфейс для любых устройств.

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
- **Zustand** - управление состоянием (аутентификация).
- **Axios** - HTTP-запросы к серверу.
- **CSS Modules** - стилизация компонентов.

---

## Структура проекта

marketplace/
├── server/ # Серверная часть
│ ├── config/
│ │ └── database.js # Подключение к PostgreSQL
│ ├── controllers/
│ │ └── authController.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── validators.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── app.js
│ ├── server.js
│ ├── package.json
│ └── .env
│
└── frontend/ # Клиентская часть
├── public/
│ └── productImage/ # изображения товаров
├── src/
│ ├── api/
│ │ └── auth.js
│ ├── assets/
│ │ └── image.jsx # SVG-иконки
│ ├── components/
│ │ ├── Header/
│ │ ├── Hero/
│ │ ├── Categories/
│ │ ├── ProductGrid/
│ │ ├── Features/
│ │ └── Footer/
│ ├── data/
│ │ ├── products.js
│ │ ├── Auto.js
│ │ ├── Books.js
│ │ ├── Clothes.js
│ │ ├── Electronics.js
│ │ ├── House.js
│ │ └── Sport.js
│ ├── pages/
│ │ ├── HomePage/
│ │ └── AuthPage/
│ ├── store/
│ │ └── authStore.jsx
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
└── vite.config.js

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

CREATE TABLE users (
id SERIAL PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

Использование TypeScript(типизации)
Админ-панель для управления товарами и пользователями
Фильтрация и сортировка товаров
Добавление логирования
Toast уведомления
полноценное управление корзиной(сохранение, удаление и добавление в бд)
Пагинация

Автор: Игорь
