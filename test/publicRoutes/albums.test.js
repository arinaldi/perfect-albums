process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Album = require('../../src/db/models/AlbumModel');
const { albums, invalidId } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

let newAlbum = {};

describe('Public album routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let i = 0; i < albums.length; i++) {
          const album = new Album(albums[i]);
          album.save((err, album) => {
            if (err) throw new Error(err);
            if (i === 0) newAlbum = album;
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
    it('gets an array of all albums', done => {
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
    it('gets an object of favorite albums, with each year as a key', done => {
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

  describe('GET /api/albums/:id', () => {
    it('gets an album', done => {
      chai.request(app)
        .get(`/api/albums/${newAlbum.id}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.id.should.be.eql(newAlbum.id);
          res.body.artist.should.be.eql(newAlbum.artist);
          res.body.title.should.be.eql(newAlbum.title);
          res.body.year.should.be.eql(newAlbum.year);
          res.body.cd.should.be.eql(newAlbum.cd);
          res.body.aotd.should.be.eql(newAlbum.aotd);
          res.body.favorite.should.be.eql(newAlbum.favorite);

          done();
        });
    });

    it('does not get an album with an invalid ID', done => {
      chai.request(app)
        .get(`/api/albums/${invalidId}`)
        .end((_, res) => {
          res.should.have.status(404);
          res.text.should.be.eql('Album not found');

          done();
        });
    });
  });
});
