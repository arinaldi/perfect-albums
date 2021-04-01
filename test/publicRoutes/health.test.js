const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const { ERRORS, MAX_REQUEST_COUNT } = require('../../src/constants');

const should = chai.should();
chai.use(chaiHttp);

describe('Public health route', () => {
  describe('GET /api/health', () => {
    it('returns 200 and success if rate is not exceeded', done => {
      chai.request(app)
        .get('/api/health')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({ success: true });

          done();
        });
    });

    it('returns 429 and error if rate is exceeded', done => {
      Array.from({ length: MAX_REQUEST_COUNT }, (_, i) => i + 1).forEach(() => {
        chai.request(app)
          .get('/api/health')
          .end();
      });

      chai.request(app)
        .get('/api/health')
        .end((_, res) => {
          res.should.have.status(429);
          res.body.should.be.eql({ error: ERRORS.LIMIT_REACHED });

          done();
        });
    });
  });
});
