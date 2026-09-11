const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/cart", cartRoutes);

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
  console.error("Ошибка:", err);
  res.status(500).json({
    success: false,
    message: "Внутренняя ошибка сервера",
  });
});

module.exports = app;
