const router = require('express').Router();

const getAllReleases = require('../controllers/releases/getAll');

router.get('/api/health', (req, res) => {
  res.json({});
});

router.get('/api/releases', async (req, res) => {
  try {
    const releases = await getAllReleases();
    res.json(releases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
