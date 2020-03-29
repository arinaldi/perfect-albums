process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Song = require('../../src/models/song');
const { featuredSongs } = require('../data');

const { expect } = chai;
chai.use(chaiHttp);

const GET_SONGS = `
  {
    songs {
      id
      artist
      title
      link
    }
  }
`;

describe('Public song routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let i = 0; i < featuredSongs.length; i++) {
          const song = new Song(featuredSongs[i]);
          song.save(err => {
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

  describe('GET featured songs', () => {
    it('gets an array of featured songs', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query: GET_SONGS })
        .end((_, res) => {
          const songs = res.body.data.songs.map(({ artist, title, link }) => ({
            artist,
            title,
            link,
          }));

          expect(res.status).to.equal(200);
          expect(Array.isArray(songs)).to.equal(true);
          expect(songs.length).to.equal(3);
          expect(songs).to.have.deep.members(featuredSongs);

          done();
        });
    });
  });
});
