const { Router } = require('express');
const { loginJwt } = require('../middlwares/jwt.middlware');
const upload = require('../middlwares/multer.middlware');
const router = Router();
// Imports of Controllers
const { userRoutes } = require('../controllers/userRoutes.controller');

// Register
router.get('/register', userRoutes.registerPage);
router.post('/register', upload.single('image'), userRoutes.registerFunc);

// Login
router.get('/login', userRoutes.loginPage);
router.post('/login', loginJwt, userRoutes.loginFunc);

// Logout
router.get('/logout', userRoutes.logoutFunc);

module.exports = router;
