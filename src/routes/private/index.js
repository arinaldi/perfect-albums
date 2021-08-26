const router = require('express').Router();

const albums = require('./albums');
const cds = require('./cds');
const random = require('./random');

router.use('/api/albums', albums);
router.use('/api/cds', cds);
router.use('/api/random', random);

module.exports = router;
