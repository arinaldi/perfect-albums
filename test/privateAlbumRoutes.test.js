process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');
const db = require('../src/db');
const { saveUser } = require('../src/controllers/AuthenticationController');
const { albums, user } = require('./data');

const should = chai.should();
chai.use(chaiHttp);

const badAlbum = { ...albums[0] };
delete badAlbum.artist;
const validAlbum = { ...albums[3] };
let token = null;
let newAlbum = {};

describe('Private routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        saveUser(user.username, user.password)
          .then(() => done());
      })
      .catch((err) => done(err));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('POST /api/signin', () => {
    it('signs in a user and returns a token', done => {
      chai.request(app)
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

  describe('POST /api/albums', () => {
    it('does not create an album without the artist field', done => {
      chai.request(app)
        .post('/api/albums')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(badAlbum)
        .end((_, res) => {
          res.should.have.status(500);
          res.text.should.be.eql('Album validation failed: artist: Path `artist` is required.');
          done();
        });
    });

    it('creates an album', done => {
      chai.request(app)
        .post('/api/albums')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(validAlbum)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('artist');
          res.body.should.have.property('title');
          res.body.should.have.property('year');
          res.body.should.have.property('cd');
          res.body.should.have.property('aotd');
          res.body.should.have.property('favorite');

          newAlbum = res.body;
          done();
        });
    });
  });

  describe('GET /api/albums/:id', () => {
    it('gets an album', done => {
      chai.request(app)
        .get(`/api/albums/${newAlbum.id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
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
  });

  describe('PUT /api/albums/:id', () => {
    it('updates an album', done => {
      chai.request(app)
        .put(`/api/albums/${newAlbum.id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ cd: true })
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.cd.should.be.eql(true);
          done();
        });
    });
  });

  describe('DELETE /api/albums/:id', () => {
    it('deletes an album', done => {
      chai.request(app)
        .delete(`/api/albums/${newAlbum.id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({});
          done();
        });
    });
  });
});
