process.env.NODE_ENV = 'test';

const db = require('../src/db');
const Album = require('../src/models/album');
const Release = require('../src/models/release');
const Song = require('../src/models/song');
const { albums, featuredSongs, releases } = require('./data');

before(done => {
  db.connect()
    .then(() => {
      albums.forEach(album => {
        const newAlbum = new Album(album);
        newAlbum.save(err => {
          if (err) throw new Error(err);
        });
      });

      featuredSongs.forEach(song => {
        const newSong = new Song(song);
        newSong.save(err => {
          if (err) throw new Error(err);
        });
      });

      releases.forEach(release => {
        const newRelease = new Release(release);
        newRelease.save(err => {
          if (err) throw new Error(err);
        });
      });

      done();
    })
    .catch(err => done(err));
});

after(done => {
  db.close()
    .then(() => done())
    .catch(err => done(err));
});
