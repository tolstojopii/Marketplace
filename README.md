# MarketPlace - платформа для онлайн-торговли

> Full-stack платформа для онлайн-торговли с каталогом товаров, корзиной, избранным и админ-панелью.

---

## О проекте

MarketPlace - это полноценный интернет-магазин, написанный на React и Node.js. проект демонстрирует полный цикл разработки full-stack приложения: от авторизации и работы с БД до контейнеризации и продакшн-деплоя

**Ключевая особенность:** единая логика корзины и избранного для гостей и авторизованных пользователей.

- **Гость** - данные хранятся в `localStorage` (Zustand + persist)
- **Авторизованный** - данные хранятся на сервере в PostgreSQL, работают через React Query с оптимистичными обновлениями

## Возможности

**Аутентификация** - JWT, bcrypt-хеширование паролей

- **Каталог товаров** - фильтрация по категориям, сортировка, поиск, пагинация
- **Популярные товары** - отдельная витрина на главной
- **Корзина** - единая логика для гостей и юзеров, оптимистичные обновления
- **Избранное** - то же самое: работает для гостей и пользователей
- **Личный кабинет** - профиль, заказы (заглушка), избранное, настройки
- **Toast-уведомления** - глобальные уведомления через Zustand
- **Анимации** - Reveal on scroll, кастомный компонент FoldText на GSAP
- **Доступность** - `aria`-атрибуты, поддержка `prefers-reduced-motion`

### Админ

- **Создание товаров** - форма с валидацией и превью картинки
- **Ролевая модель** - `user` / `admin`, защищённые роуты
- **Rate limiting** - защита `/api/auth/*` от брутфорса

Проект состоит из двух частей:

- **Сервер** (backend) - Node.js + Express + PostgreSQL.
- **Клиент** (frontend) - React + React Router + Zustand.

---

## Стек технологий

### Backend

- **Node.js** + **Express** - создание REST API
- **PostgreSQL** - база данных
- **pg** - драйвер для работы с PostgreSQL
- **node-pg-migrate** - миграции схемы бд
- **bcryptjs** - хеширование паролей
- **jsonwebtoken** - генерация и проверка JWT
- **express-validator** - валидация данных
- **express-rate-limit** - ограничение кол-во(частоты) запросов
- **helmet** - security заголовоки
- **cors** - настройка CORS
- **dotenv** - управление переменными окружения
- **Jest+SuperTest** - тестирование API

### Frontend

- **React** (v18+) - пользовательский интерфейс
- **React Router** - маршрутизация
- **TanStack query** - серверное состояние, кещ, мутации
- **Zustand** - управление состоянием (аутентификация)
- **Axios** - HTTP-запросы к серверу
- **CSS Modules** - стилизация компонентов
- **GSAP** - анимации

### DevOps

- **Docker** + **Docker Compose** - контейнеризация

---

## Установка и запуск

### Требования

- **Docker Desktop**
- **Node.js 20+**

1. **Клонирование репозитория**

```bash
git clone https://github.com/tolstojopii/Marketplace.git
cd marketplace
```

2. **Создать `.env` из шаблона**

```bash
cp .env.example .env
```

Открой `.env` и заполни:

```env
POSTGRES_DB=marketplace
POSTGRES_USER=marketplace
POSTGRES_PASSWORD=change_me
PORT=5000
NODE_ENV=development
JWT_SECRET=<сгенерируй случайную строку>
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgres://marketplace:change_me@localhost:5432/marketplace
```

Сгенерировать `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. **Запусти бэкенд и БД**

```bash
docker compose up -d
```

Поднимутся 4 сервиса: `db`, `migrate` (одноразово), `api`, и всёбудетготово к работе.

4. **Загрузи тестовые данные** (один раз)

```bash
docker compose run --rm api npm run seed
```

5. **Запусти фронтенд** (в отдельном терминале)

```bash
cd src
npm install
npm run dev
```

## 🛠️ Запуск без Docker (для разработки)

Если хочешь hot-reload бэкенда (`nodemon`) — запускай его локально, а БД оставь в Docker.

1. **Подними только БД**

```bash
docker compose up -d db
```

2. **Бэкенд**

```bash
cd server
npm install
npm run migrate:up
npm run seed
npm run dev
```

3. **Фронтенд**

```bash
cd src
npm install
npm run dev
```

---

##  Переменные окружения

Файл `.env` лежит **в корне проекта** — так его видит и Docker Compose, и Node.js (через явный `path` в `config/env.js`)

| Переменная | Описание | Пример |
|---|---|---|
| `POSTGRES_DB` | Имя БД | `marketplace` |
| `POSTGRES_USER` | Пользователь БД | `marketplace` |
| `POSTGRES_PASSWORD` | Пароль БД | `change_me` |
| `PORT` | Порт API | `5000` |
| `NODE_ENV` | Окружение | `development` / `production` |
| `JWT_SECRET` | Секрет для JWT | 64 hex-символа |
| `CLIENT_URL` | URL фронтенда для CORS | `http://localhost:5173` |
| `DATABASE_URL` | Строка подключения | `postgres://user:pass@host:5432/db` |

---

## полезные команды

### Docker
```bash
docker compose up -d              # запустить всё в фоне
docker compose down               # остановить
docker compose down -v            # остановить + удалить данные БД
docker compose ps                 # статус
docker compose logs -f api        # логи API в реальном времени
docker compose restart api        # перезапуск API
docker compose up --build api     # пересобрать API
```

### Миграции и сиды
```bash
cd server
npm run migrate:up                 # применить миграции
npm run migrate:down               # откатить последнюю
npm run migrate:create -- <name>   # создать новую
npm run seed                       # загрузить сиды
```

### Тесты
```bash
cd server
npm test                           # Jest
```


##  Реализовано
- JWT-аутентификация, регистрация, роли (`user` / `admin`)
- Каталог: категории, фильтры, сортировка, поиск, пагинация, "популярные"
- Корзина и избранное - единая логика для гостей и юзеров
- Оптимистичные обновления через React Query
- Админ-панель для создания товаров
- Skeleton-загрузки, Toast-уведомления
- Docker Compose с healthcheck и миграциями
- Rate limiting, helmet, CORS
- Миграции БД, сиды
- Тесты API (auth)
- Анимации (GSAP, reveal on scroll)




### Будущие улучшения

- Интеграция TypeScript
- Админ-панель для управления товарами и пользователями
- Фильтрация и сортировка товаров **сделано**
- Добавление логирования
- Пагинация **сделано**
- Тесты для cart/favorites/products - по аналогии с auth
- Swagger
- Оптимизация картинок
- Скелетоны **сделано**
- PWA через vite-plugin-pwa.

Автор: **Игорь**
- GitHub: https://github.com/tolstojopii