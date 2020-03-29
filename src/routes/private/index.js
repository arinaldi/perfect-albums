const router = require('express').Router();

const albums = require('./albums');
const releases = require('./releases');

router.use('/api/albums', albums);
router.use('/api/releases', releases);

module.exports = router;
