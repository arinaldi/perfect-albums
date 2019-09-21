process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Release = require('../../src/db/models/ReleaseModel');
const { releases } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

describe('Public release routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let k = 0; k < releases.length; k++) {
          const release = new Release(releases[k]);
          release.save(err => {
            if (err) throw new Error(err);
          });
        }

        done();
      })
      .catch((err) => done(err));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('GET /api/releases', () => {
    it('gets an array of all releases', done => {
      chai.request(app)
        .get('/api/releases')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(releases.length);

          done();
        });
    });
  });
});
