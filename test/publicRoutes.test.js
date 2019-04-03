const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');

const should = chai.should();
chai.use(chaiHttp);

describe('GET /api/health', () => {
  it('Returns 200 and {}', done => {
    chai.request(app)
      .get('/health')
      .end((_, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({});
        done();
      });
  });
});
