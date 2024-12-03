const { Router } = require('express');
const router = Router();

const { signOutJwt } = require('../middlwares/jwt.middlware');

router.get('/', signOutJwt, (req, res) => {
  res.redirect('/login');
});

module.exports = router;
