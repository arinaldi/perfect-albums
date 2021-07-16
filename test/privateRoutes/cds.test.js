const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const { saveUser } = require('../../src/controllers/auth/signUp');
const { albums, getUser } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

const user = getUser();
let token = null;
const cdCount = albums.filter((album) => Boolean(album.cd)).length;

describe('Private cd routes', () => {
  before(async () => {
    await saveUser(user.username, user.password);
  });

  describe('POST /api/signin', () => {
    it('signs in a user and returns a token', (done) => {
      chai
        .request(app)
        .post('/api/signin')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');

          token = res.body.token;
          done();
        });
    });
  });

  describe('GET /api/cds', () => {
    it('gets a count of CDs', (done) => {
      chai
        .request(app)
        .get('/api/cds')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(cdCount);

          done();
        });
    });
  });
});
