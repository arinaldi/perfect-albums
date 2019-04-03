process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/app');
const db = require('../src/db');
const Album = require('../src/db/models/AlbumModel');

const should = chai.should();
chai.use(chaiHttp);

const test = [
  {
    artist: 'Nirvana',
    title: 'Nevermind',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    artist: 'Pearl Jam',
    title: 'Ten',
    year: '1991',
    cd: true,
    aotd: true,
    favorite: true,
  },
  {
    artist: 'HIM',
    title: 'Razorblade Romance',
    year: '1999',
    cd: true,
    aotd: true,
    favorite: true,
  },
];

describe('Public album routes', () => {
  before(done => {
    db.connect()
      .then(() => {
        for (let i = 0; i < test.length; i++) {
          const album = new Album(test[i]);
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

  it('GET /api/albums', done => {
    chai.request(app)
      .get('/api/albums')
      .end((_, res) => {
        res.should.have.status(200);
        res.body.length.should.be.eql(3);
        done();
      });
  });

  it('GET /api/favorites', done => {
    chai.request(app)
      .get('/api/favorites')
      .end((_, res) => {
        res.should.have.status(200);
        res.body.should.have.property('1991');
        res.body.should.have.property('1999');
        done();
      });
  });
});
