const router = require('express').Router();

const createAlbum = require('../../controllers/albums/createAlbum');
const editAlbum = require('../../controllers/albums/editAlbum');
const deleteAlbum = require('../../controllers/albums/deleteAlbum');

const { ERRORS } = require('../../constants');

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

module.exports = router;
