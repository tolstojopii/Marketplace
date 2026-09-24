const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes");


const { apiLimiter, authLimiter } = require("./middleware/rateLimit");

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));


app.use("/api", (req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.set("etag", false);

app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);


app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API marketplace работает",
    version: "1.0.0",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "маршрут не найден",
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Некорректный JSON" });
  }
  if (err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ success: false, message: "Слишком большой запрос" });
  }

  console.error("Ошибка:", err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: status === 500 ? "Внутренняя ошибка сервера" : err.message,
  });
});

module.exports = app;
