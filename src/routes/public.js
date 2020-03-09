const router = require('express').Router();

const getFavorites = require('../controllers/albums/getFavorites');
const getAllSongs = require('../controllers/songs/getAllSongs');
const getAllReleases = require('../controllers/releases/getAllReleases');

router.get('/api/health', (req, res) => {
  res.send({});
});

router.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await getFavorites();
    res.send(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/songs', async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.send(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/releases', async (req, res) => {
  try {
    const releases = await getAllReleases();
    res.send(releases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
