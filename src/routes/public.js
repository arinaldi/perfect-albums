const router = require('express').Router();

const getAlbumsByDate = require('../controllers/albums/getByDate');
const { formatArtists, isValidDate } = require('../utils');
const { ERRORS } = require('../constants');

router.get('/api/health', (req, res) => {
  res.json({});
});

router.get('/api/albums/date/:date', async (req, res) => {
  const { date } = req.params;

  if (!isValidDate(date)) {
    return res.status(400).json({ error: ERRORS.INVALID_DATE });
  }

  try {
    const isoString = (new Date(date)).toISOString();
    const albums = await getAlbumsByDate(isoString);
    const artists = formatArtists(albums);
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message || ERRORS.GENERIC });
  }
});

module.exports = router;
