require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../app");
const db = require("../config/database");

describe("Auth API", () => {
  beforeEach(async () => {
    await db.query("TRUNCATE users RESTART IDENTITY CASCADE");
  });

  afterAll(async () => {
    await db.pool.end();
  });

  it("регистрирует нового пользователя", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ full_name: "Test", email: "a@test.com", password: "123456" })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe("a@test.com");
  });

  it("409 при регистрации на занятый email", async () => {
    const user = {
      full_name: "Test",
      email: "dup@test.com",
      password: "123456",
    };
    await request(app)
    .post("/api/auth/register")
    .send(user)
    .expect(201);

    const res=await request(app)
    .post("/api/auth/register")
    .send(user);

    expect(res.status).toBe(409)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/существует/i);
  });

  it("логинит с правильным паролем", async () => {
    const user = { full_name: "Test", email: "c@test.com", password: "123456" };
    await request(app).post("/api/auth/register").send(user);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password })
      .expect(200);

    expect(res.body.data.token).toBeDefined();
  });

  it("401 при неверном пароле", async () => {
    const user = { full_name: "Test", email: "d@test.com", password: "123456" };
    await request(app).post("/api/auth/register").send(user);

    await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong" })
      .expect(401);
  });

  it("401 без токена на /me", async () => {
    await request(app).get("/api/auth/me").expect(401);
  });

  it("возвращает данные по валидному токену", async () => {
    const reg = await request(app)
      .post("/api/auth/register")
      .send({ full_name: "Test", email: "e@test.com", password: "123456" });

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${reg.body.data.token}`)
      .expect(200);

    expect(res.body.data.user.email).toBe("e@test.com");
  });
});
