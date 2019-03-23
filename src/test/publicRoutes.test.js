const request = require('supertest');
const app = require('../app');

describe('GET /api/health ', () => {
  test('It should respond with a 200 and an empty object', async (done) => {
    const response = await request(app).get('/api/health');
    expect(response.body).toEqual({});
    expect(response.statusCode).toBe(200);
    done();
  });
});
