const router = require('express').Router();

const albums = require('./albums');
const releases = require('./releases');
const songs = require('./songs');

router.use('/api/albums', albums);
router.use('/api/releases', releases);
router.use('/api/songs', songs);

router.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = router;
