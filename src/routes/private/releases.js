const router = require('express').Router();

const createRelease = require('../../controllers/releases/create');
const editRelease = require('../../controllers/releases/edit');
const deleteRelease = require('../../controllers/releases/delete');

const { ERRORS } = require('../../constants');

router.post('/', async (req, res) => {
  try {
    const newRelease = await createRelease(req.body);
    res.json(newRelease);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRelease = await editRelease(req.params.id, req.body);
    if (!updatedRelease) {
      res.status(404).json(ERRORS.RELEASE);
    } else {
      res.json(updatedRelease);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRelease(id);
    res.json(`Release successfully deleted: ${id}`);
  } catch (err) {
    const status = err.message === ERRORS.RELEASE ? 404 : 500;
    res.status(status).json(err.message);
  }
});

module.exports = router;
