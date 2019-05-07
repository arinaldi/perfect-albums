const router = require('express').Router();

const createAlbum = require('../controllers/albums/createAlbum');
const editAlbum = require('../controllers/albums/editAlbum');
const deleteAlbum = require('../controllers/albums/deleteAlbum');

const createSong = require('../controllers/songs/createSong');
const deleteSong = require('../controllers/songs/deleteSong');

router.post('/api/albums', async (req, res) => {
  try {
    const newAlbum = await createAlbum(req.body);
    res.send(newAlbum);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/api/albums/:id', async (req, res) => {
  try {
    const updatedAlbum = await editAlbum(req.params.id, req.body);
    if (!updatedAlbum) {
      res.status(404).send('Album not found');
    } else {
      res.send(updatedAlbum);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/api/albums/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAlbum(id);
    res.send(`Album successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === 'Album not found' ? 404 : 500;
    res.status(status).send(err.message);
  }
});

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
    const status = err.message === 'Song not found' ? 404 : 500;
    res.status(status).send(err.message);
  }
});

module.exports = router;
