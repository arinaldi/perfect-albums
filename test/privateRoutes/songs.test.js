process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const { saveUser } = require('../../src/controllers/auth/signUp');
const { ERRORS } = require('../../src/constants');
const { featuredSongs, invalidId, getUser } = require('../data');

const { expect } = chai;
chai.use(chaiHttp);

const CREATE_SONG = `
  mutation CreateSong($artist: String!, $title: String!, $link: String!) {
    createSong(artist: $artist, title: $title, link: $link) {
      id
      artist
      title
      link
    }
  }
`;

const DELETE_SONG = `
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const user = getUser();

const validSong = { ...featuredSongs[2] };
const invalidSong = { ...featuredSongs[0] };
delete invalidSong.artist;

let token = null;
let newSong = {};

describe('Private song routes', () => {
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

  describe('POST a feauted song', () => {
    it('creates a featured song', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: CREATE_SONG,
          variables: validSong,
        })
        .end((_, res) => {
          const { createSong } = res.body.data;
          const { id, ...song } = createSong;

          expect(res.status).to.equal(200);
          expect(song).to.eql(validSong);

          newSong = createSong;
          done();
        });
    });

    it('does not create a featured song without the artist field', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: CREATE_SONG,
          variables: invalidSong,
        })
        .end((_, res) => {
          const { text } = res.error;

          expect(res.status).to.equal(500);
          expect(text).to.have.string('Variable \\"$artist\\" of required type \\"String!\\" was not provided.');

          done();
        });
    });
  });

  describe('DELETE a featured song', () => {
    it('deletes a featured song', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: DELETE_SONG,
          variables: { id: newSong.id },
        })
        .end((_, res) => {
          const { deleteSong } = res.body.data;

          expect(res.status).to.equal(200);
          expect(deleteSong).to.eql({ id: newSong.id });

          done();
        });
    });

    it('does not delete a featured song with an invalid ID', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)
        .send({
          query: DELETE_SONG,
          variables: { id: invalidId },
        })
        .end((_, res) => {
          const { text } = res.error;

          expect(res.status).to.equal(500);
          expect(text).to.have.string(ERRORS.SONG);

          done();
        });
    });
  });
});
