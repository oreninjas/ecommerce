const { Router } = require('express');
const { product } = require('../controllers/products.controller');
const { tokenVerify } = require('../middlwares/jwt.middlware');
const router = Router();
const upload = require('../middlwares/multer.middlware');

// Product showcase!
router.get('/', tokenVerify, product.productsPage);
router.get('/:id', tokenVerify, product.eachProductPage);

// Product creation!
router.get('/create', tokenVerify, product.createPage);
router.post('/create', tokenVerify, upload.single('productImage'), product.createFunc);

// Add product to cart!
router.post('/addtocart/:id', tokenVerify, product.addToCart);

module.exports = router;
