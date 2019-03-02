const router = require('express').Router();
const getAllAlbums = require('../controllers/albums/getAllAlbums');
const getFavorites = require('../controllers/albums/getFavorites');
const getAlbumById = require('../controllers/albums/getAlbumById');

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

router.get('/api/albums/:id', async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id);
    res.send(album);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
