const { Router } = require('express');
const { product } = require('../controllers/products.controller');
const { tokenVerify } = require('../middlwares/jwt.middlware');
const router = Router();
const upload = require('../middlwares/multer.middlware');

router.get('/', tokenVerify, product.productsPage);
router.get('/create', tokenVerify, product.createPage);
router.post('/create', tokenVerify, upload.single('productImage'), product.createFunc);

module.exports = router;
