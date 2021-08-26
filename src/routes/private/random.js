const router = require('express').Router();

const getRandom = require('../../controllers/albums/getRandom');

router.get('/', async (_, res) => {
  try {
    const album = await getRandom();
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
