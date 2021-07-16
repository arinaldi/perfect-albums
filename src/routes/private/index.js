const router = require('express').Router();

const albums = require('./albums');
const cds = require('./cds');

router.use('/api/albums', albums);
router.use('/api/cds', cds);

module.exports = router;
