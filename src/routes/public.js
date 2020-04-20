const router = require('express').Router();

const getArtists = require('../controllers/albums/getArtists');
const { ERRORS } = require('../constants');

router.get('/api/health', (req, res) => {
  res.json({});
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
