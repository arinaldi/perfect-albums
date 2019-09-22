process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../src/app');
const db = require('../../src/db');
const Song = require('../../src/db/models/SongModel');
const { songs } = require('../data');

const should = chai.should();
chai.use(chaiHttp);

describe('Public song routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let i = 0; i < songs.length; i++) {
          const song = new Song(songs[i]);
          song.save(err => {
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

  describe('GET /api/songs', () => {
    it('gets an array of all songs', done => {
      chai.request(app)
        .get('/api/songs')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(songs.length);

          done();
        });
    });
  });
});
