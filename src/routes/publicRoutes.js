const router = require('express').Router();

const getAllAlbums = require('../controllers/albums/getAllAlbums');
const getFavorites = require('../controllers/albums/getFavorites');
const getAllSongs = require('../controllers/songs/getAllSongs');
const getAllReleases = require('../controllers/releases/getAllReleases');
const getAlbumById = require('../controllers/albums/getAlbumById');

router.get('/api/health', (req, res) => {
  res.send({});
});

router.get('/api/albums', async (req, res) => {
  try {
    const albums = await getAllAlbums();
    res.send(albums);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await getFavorites();
    res.send(favorites);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/songs', async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.send(songs);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/releases', async (req, res) => {
  try {
    const releases = await getAllReleases();
    res.send(releases);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/albums/:id', async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id);

    if (!album) {
      res.status(404).send('Album not found');
    } else {
      res.send(album);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;
