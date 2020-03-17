process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Album = require('../../src/models/album');
const { albums } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

describe('Public favorites routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let i = 0; i < albums.length; i++) {
          const album = new Album(albums[i]);
          album.save(err => {
            if (err) throw new Error(err);
          });
        }

        done();
      })
      .catch(err => done(err));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch(err => done(err));
  });

  describe('GET /api/favorites', () => {
    it('gets an object of favorite albums, with each year as a key', done => {
      const date1 = '1991';
      const date2 = '1999';

      chai.request(app)
        .get('/api/favorites')
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
