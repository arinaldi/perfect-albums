const router = require('express').Router();

const getAllAlbums = require('../../controllers/albums/getAllAlbums');
const getAlbumById = require('../../controllers/albums/getAlbumById');
const createAlbum = require('../../controllers/albums/createAlbum');
const editAlbum = require('../../controllers/albums/editAlbum');
const deleteAlbum = require('../../controllers/albums/deleteAlbum');

const { ERRORS } = require('../../constants');

router.get('/', async (req, res) => {
  try {
    const albums = await getAllAlbums(req.query);
    res.send(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id);

    if (!album) {
      res.status(404).json({ error: ERRORS.ALBUM });
    } else {
      res.send(album);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAlbum = await createAlbum(req.body);
    res.send(newAlbum);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAlbum(id);
    res.send(`Album successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === ERRORS.ALBUM ? 404 : 500;
    res.status(status).send(err.message);
  }
});

module.exports = router;
