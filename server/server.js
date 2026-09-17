require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`сервер запущет на порту ${PORT}`);
  console.log(`api доступно по адресу http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("ошибка сервера:", err);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM получен, закрываем соединения...");
  server.close(() => process.exit(0));
});