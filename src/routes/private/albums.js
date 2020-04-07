const router = require('express').Router();

const getAllAlbums = require('../../controllers/albums/getAll');
const getAlbumById = require('../../controllers/albums/getById');
const createAlbum = require('../../controllers/albums/create');
const editAlbum = require('../../controllers/albums/edit');
const deleteAlbum = require('../../controllers/albums/delete');

const { ERRORS } = require('../../constants');

router.get('/', async (req, res) => {
  try {
    const albums = await getAllAlbums(req.query);
    res.json(albums);
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
      res.json(album);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAlbum = await createAlbum(req.body);
    res.json(newAlbum);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAlbum = await editAlbum(req.params.id, req.body);
    if (!updatedAlbum) {
      res.status(404).json(ERRORS.ALBUM);
    } else {
      res.json(updatedAlbum);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAlbum(id);
    res.json(`Album successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === ERRORS.ALBUM ? 404 : 500;
    res.status(status).json(err.message);
  }
});

module.exports = router;
