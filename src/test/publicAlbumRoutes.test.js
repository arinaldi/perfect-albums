const request = require('supertest');

const app = require('../app');
const db = require('../db');

describe('GET /notes', () => {
  beforeAll((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  afterAll((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  test('GET /api/albums', async (done) => {
    const { body, statusCode } = await request(app).get('/api/albums');
    expect(body).toEqual([]);
    expect(statusCode).toBe(200);
    done();
  });

  test('GET /api/favorites', async (done) => {
    const { body, statusCode } = await request(app).get('/api/favorites');
    expect(body).toEqual({});
    expect(statusCode).toBe(200);
    done();
  });
});
