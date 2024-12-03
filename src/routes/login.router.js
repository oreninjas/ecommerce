const { Router } = require('express');
const router = Router();
const { loginJwt } = require('../middlwares/jwt.middlware');

// router.get('/', dev.login);

router.post('/', loginJwt, (req, res) => {
  res.redirect('/products');
});

module.exports = router;
