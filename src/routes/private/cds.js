const router = require('express').Router();

const getCdCount = require('../../controllers/albums/getCdCount');

router.get('/', async (req, res) => {
  try {
    const count = await getCdCount();
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
