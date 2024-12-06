const { Router } = require('express');
const { loginJwt, tokenVerify } = require('../middlwares/jwt.middlware');
const upload = require('../middlwares/multer.middlware');
const router = Router();
// Imports of Controllers
const { userRoutes } = require('../controllers/userRoutes.controller');
const { product } = require('../controllers/products.controller');

// Slash Redirector
router.get('/', userRoutes.slashRedirector);

// Register
router.get('/register', userRoutes.registerPage);
router.post('/register', upload.single('image'), userRoutes.registerFunc);

// Login
router.get('/login', userRoutes.loginPage);
router.post('/login', loginJwt, userRoutes.loginFunc);

// Logout
router.get('/logout', userRoutes.logoutFunc);

// Basket
router.get('/basket', product.basketPage);

// Search Suggestions!
router.get('/search-suggestions', product.searchSuggestions)
// Its not working the search without any err
module.exports = router;
