const cloudinary = require('cloudinary').v2;
const { Router } = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinaryUploader = require('../utils/cloudinary');
const upload = require('../middlwares/multer.middlware');
const router = Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', upload.single('image'), async (req, res) => {
  const { username, email, password } = req.body;
  const image = req.file?.path;

  let imageUrl = null;
  if (image) {
    const uploadResult = await cloudinaryUploader(image); // then how do we accesss or where do we access in cloudinary?
    if (uploadResult) {
      imageUrl = uploadResult.url;
    }
  } else {
    null;
  }

  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUser) {
    return res.status(409).send({ message: 'username already exists!' });
  }

  if ([username, email, password].some((fields) => fields?.trim() === '')) {
    return res.status(400).send({ message: 'All fields are required!' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    imageUrl,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.cookie('token', token);
  res.redirect('/products');
});

module.exports = router;
