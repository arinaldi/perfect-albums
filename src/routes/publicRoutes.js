const router = require('express').Router();

router.get('/api/health', (req, res) => {
  res.send({});
});

module.exports = router;
