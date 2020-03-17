const router = require('express').Router();

const createSong = require('../../controllers/songs/create');
const deleteSong = require('../../controllers/songs/delete');

const { ERRORS } = require('../../constants');

router.post('/', async (req, res) => {
  try {
    const newSong = await createSong(req.body);
    res.send(newSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
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
