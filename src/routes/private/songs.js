const router = require('express').Router();

const createSong = require('../../controllers/songs/createSong');
const deleteSong = require('../../controllers/songs/deleteSong');

const { ERRORS } = require('../../constants');

router.post('/api/songs', async (req, res) => {
  try {
    const newSong = await createSong(req.body);
    res.send(newSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/api/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteSong(id);
    res.send(`Song successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === ERRORS.SONG ? 404 : 500;
    res.status(status).send(err.message);
  }
});

module.exports = router;
