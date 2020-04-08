const router = require('express').Router();

router.get('/api/health', (req, res) => {
  res.json({});
});

module.exports = router;
