process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');
const db = require('../src/db');
const { saveUser } = require('../src/controllers/authController');
const { albums, invalidId, user } = require('./data');

const should = chai.should();
chai.use(chaiHttp);

const invalidAlbum = { ...albums[0] };
delete invalidAlbum.artist;
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

    it('does not create an album without the artist field', done => {
      chai.request(app)
        .post('/api/albums')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(invalidAlbum)
        .end((_, res) => {
          res.should.have.status(500);
          res.text.should.be.eql('Album validation failed: artist: Path `artist` is required.');
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

    it('does not update an album with an invalid ID', done => {
      chai.request(app)
        .put(`/api/albums/${invalidId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ cd: true })
        .end((_, res) => {
          res.should.have.status(404);
          res.text.should.be.eql('Album not found');
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

    it('does not delete an album with an invalid ID', done => {
      chai.request(app)
        .delete(`/api/albums/${invalidId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          res.should.have.status(404);
          res.text.should.be.eql('Album not found');
          done();
        });
    });
  });
});
