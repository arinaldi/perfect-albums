process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');
const db = require('../src/db');
const Album = require('../src/db/models/AlbumModel');
const { albums } = require('./data');

const should = chai.should();
chai.use(chaiHttp);

describe('Public routes', () => {
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
      .catch((err) => done(err));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('GET /api/albums', () => {
    it('Returns an array of all albums', done => {
      chai.request(app)
        .get('/api/albums')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(albums.length);
          done();
        });
    });
  });

  describe('GET /api/favorites', () => {
    it('Returns an object of favorite albums, with each year as a key', done => {
      chai.request(app)
        .get('/api/favorites')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('1991');
          res.body.should.have.property('1999');
          res.body['1991'].length.should.be.eql(2);
          res.body['1999'].length.should.be.eql(1);
          done();
        });
    });
  });
});
