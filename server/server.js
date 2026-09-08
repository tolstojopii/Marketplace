const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`сервер запущет на порту ${PORT}`);
  console.log(`api доступно по адресу http://localhost:${PORT}`);
});
