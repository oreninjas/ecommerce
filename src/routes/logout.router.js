const { Router } = require('express');
const router = Router();

const jwtRemover = require('../middlwares/jwt.remove.middlware');

router.get('/', jwtRemover, (req, res) => {
  res.redirect('/login');
});

module.exports = router;
