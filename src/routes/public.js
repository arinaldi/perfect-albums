const router = require('express').Router();

const getAllReleases = require('../controllers/releases/getAll');

router.get('/api/health', (req, res) => {
  res.send({});
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
