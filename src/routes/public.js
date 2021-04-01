const router = require('express').Router();

const getArtists = require('../controllers/albums/getArtists');
const { ERRORS } = require('../constants');
const { rateLimiter } = require('../middleware');

router.get('/api/health', rateLimiter, (req, res) => {
  res.json({ success: true });
});

router.get('/api/artists', async (req, res) => {
  try {
    const artists = await getArtists();
    res.json(artists.sort());
  } catch (err) {
    res.status(500).json({ error: err.message || ERRORS.GENERIC });
  }
});

module.exports = router;
