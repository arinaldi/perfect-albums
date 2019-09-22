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
        for (let i = 0; i < releases.length; i++) {
          const release = new Release(releases[i]);
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
    it('gets an object of all releases, with date as a key', done => {
      const date1 = '4 Oct 2019';
      const date2 = '11 Oct 2019';

      chai.request(app)
        .get('/api/releases')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property(date1);
          res.body.should.have.property(date2);
          res.body[date1].length.should.be.eql(2);
          res.body[date2].length.should.be.eql(1);

          done();
        });
    });
  });
});
