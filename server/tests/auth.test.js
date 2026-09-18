const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
  const testUser = {
    full_name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  beforeAll(async () => {
  });

  it('должен регистрировать нового пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user.email).toBe(testUser.email);
  });

  it('должен возвращать ошибку при регистрации с существующим email', async () => {
    await request(app).post('/api/auth/register').send(testUser); // Создаём пользователя

    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(409);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('существует');
  });

  it('должен логинить пользователя с правильными данными', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });

  it('должен возвращать 401 при неверном пароле', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' })
      .expect(401);
  });
});