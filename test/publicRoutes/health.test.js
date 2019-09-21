process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');

const should = chai.should();
chai.use(chaiHttp);

describe('Public health route', () => {
  describe('GET /api/health', () => {
    it('returns 200 and {}', done => {
      chai.request(app)
        .get('/health')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({});

          done();
        });
    });
  });
});
