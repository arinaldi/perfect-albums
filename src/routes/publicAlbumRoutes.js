const express = require('express');
const { list, show } = require('../controllers/AlbumController');

const router = express.Router();

router.get('/api/albums', list);
router.get('/api/albums/:id', show);

module.exports = router;
