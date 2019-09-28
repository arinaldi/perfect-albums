const router = require('express').Router();

const createAlbum = require('../controllers/albums/createAlbum');
const editAlbum = require('../controllers/albums/editAlbum');
const deleteAlbum = require('../controllers/albums/deleteAlbum');

const createSong = require('../controllers/songs/createSong');
const deleteSong = require('../controllers/songs/deleteSong');

const createRelease = require('../controllers/releases/createRelease');
const editRelease = require('../controllers/releases/editRelease');
const deleteRelease = require('../controllers/releases/deleteRelease');

const { ERRORS } = require('../constants');

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
      res.status(404).send(ERRORS.ALBUM);
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
    const status = err.message === ERRORS.ALBUM ? 404 : 500;
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
    const status = err.message === ERRORS.SONG ? 404 : 500;
    res.status(status).send(err.message);
  }
});

router.post('/api/releases', async (req, res) => {
  try {
    const newRelease = await createRelease(req.body);
    res.send(newRelease);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/api/releases/:id', async (req, res) => {
  try {
    const updatedRelease = await editRelease(req.params.id, req.body);
    if (!updatedRelease) {
      res.status(404).send(ERRORS.RELEASE);
    } else {
      res.send(updatedRelease);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/api/releases/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRelease(id);
    res.send(`Release successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === ERRORS.RELEASE ? 404 : 500;
    res.status(status).send(err.message);
  }
});

module.exports = router;
