process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { DB_OPTIONS } = require('../src/db');
const Album = require('../src/models/album');
const Release = require('../src/models/release');
const Song = require('../src/models/song');
const { albums, featuredSongs, releases } = require('./data');

let connection;
let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  connection = await mongoose.connect(mongoServer.getUri(), DB_OPTIONS);

  albums.forEach((album) => {
    const newData = new Album(album);
    newData.save((err) => {
      if (err) throw new Error(err);
    });
  });

  featuredSongs.forEach((song) => {
    const newSong = new Song(song);
    newSong.save((err) => {
      if (err) throw new Error(err);
    });
  });

  releases.forEach((release) => {
    const newRelease = new Release(release);
    newRelease.save((err) => {
      if (err) throw new Error(err);
    });
  });
});

after(async () => {
  if (connection) {
    await connection.disconnect();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
});
