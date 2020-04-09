const router = require('express').Router();

const albums = require('./albums');

router.use('/api/albums', albums);

module.exports = router;
