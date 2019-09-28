process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const { saveUser } = require('../../src/controllers/authController');
const { ERRORS } = require('../../src/constants');
const { releases, invalidId, getUser } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

const user = getUser();

const validRelease = { ...releases[0] };
const invalidRelease = { ...releases[1] };
delete invalidRelease.artist;

const date = '2019-10-31T05:00:00.000Z';
let token = null;
let newRelease = {};

describe('Private release routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        saveUser(user.username, user.password)
          .then(() => done());
      })
      .catch(err => done(err));
  });

  after(done => {
    db.close()
      .then(() => done())
      .catch(err => done(err));
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

  describe('POST /api/releases', () => {
    it('creates a release', done => {
      chai.request(app)
        .post('/api/releases')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(validRelease)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('artist');
          res.body.should.have.property('title');
          res.body.should.have.property('date');

          newRelease = res.body;
          done();
        });
    });

    it('does not create a release without the artist field', done => {
      chai.request(app)
        .post('/api/releases')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send(invalidRelease)
        .end((_, res) => {
          res.should.have.status(500);
          res.text.should.be.eql('Release validation failed: artist: Path `artist` is required.');

          done();
        });
    });
  });

  describe('PUT /api/releases/:id', () => {
    it('updates a release', done => {
      chai.request(app)
        .put(`/api/releases/${newRelease.id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ date })
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.date.should.be.eql(date);

          done();
        });
    });

    it('does not update a release with an invalid ID', done => {
      chai.request(app)
        .put(`/api/releases/${invalidId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({ date })
        .end((_, res) => {
          res.should.have.status(404);
          res.text.should.be.eql(ERRORS.RELEASE);

          done();
        });
    });
  });

  describe('DELETE /api/releases/:id', () => {
    it('deletes a release', done => {
      chai.request(app)
        .delete(`/api/releases/${newRelease.id}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.eql({});

          done();
        });
    });

    it('does not delete a release with an invalid ID', done => {
      chai.request(app)
        .delete(`/api/releases/${invalidId}`)
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .end((_, res) => {
          res.should.have.status(404);
          res.text.should.be.eql(ERRORS.RELEASE);

          done();
        });
    });
  });
});
