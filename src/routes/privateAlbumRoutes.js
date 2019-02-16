const express = require('express');
const { create, edit, remove } = require('../controllers/AlbumController');

const router = express.Router();

router.post('/api/albums', create);
router.put('/api/albums/:id', edit);
router.delete('/api/albums/:id', remove);

module.exports = router;
