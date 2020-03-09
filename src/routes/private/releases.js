const router = require('express').Router();

const createRelease = require('../../controllers/releases/createRelease');
const editRelease = require('../../controllers/releases/editRelease');
const deleteRelease = require('../../controllers/releases/deleteRelease');

const { ERRORS } = require('../../constants');

router.post('/', async (req, res) => {
  try {
    const newRelease = await createRelease(req.body);
    res.send(newRelease);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
