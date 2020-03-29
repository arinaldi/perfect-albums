process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Album = require('../../src/models/album');
const { albums, favoriteAlbums } = require('../data');

const { expect } = chai;
chai.use(chaiHttp);

const GET_FAVORITES = `
  {
    favorites {
      artist
      title
      year
    }
  }
`;

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

  describe('GET favorites', () => {
    it('gets an array of favorite albums', done => {
      chai.request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query: GET_FAVORITES })
        .end((_, res) => {
          const { favorites } = res.body.data;

          expect(res.status).to.equal(200);
          expect(Array.isArray(favorites)).to.equal(true);
          expect(favorites.length).to.equal(3);
          expect(favorites).to.have.deep.members(favoriteAlbums);

          done();
        });
    });
  });
});
