const router = require('express').Router();

const getArtists = require('../controllers/albums/getArtists');
const getIds = require('../controllers/albums/getIds');
const { ERRORS } = require('../constants');
const rateLimiter = require('../middleware/rateLimiter');

router.get('/api/health', rateLimiter, (_, res) => {
  res.json({ success: true });
});

router.get('/api/artists', async (_, res) => {
  try {
    const artists = await getArtists();
    res.json(artists.sort());
  } catch (err) {
    res.status(500).json({ error: err.message || ERRORS.GENERIC });
  }
});

router.get('/api/albums/ids', async (_, res) => {
  try {
    const ids = await getIds();
    res.json(ids);
  } catch (err) {
    res.status(500).json({ error: err.message || ERRORS.GENERIC });
  }
});

module.exports = router;
