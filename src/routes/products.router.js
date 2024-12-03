const { Router } = require('express');
const router = Router();
const { autoRedirect } = require('../middlwares/jwt.middlware');

router.get('/', autoRedirect, (req, res) => {
  res.render('/products');
});

module.exports = router;
