const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinaryUploader = require('../utils/cloudinary');

const userRoutes = {
  registerPage: (req, res) => {
    res.render('register');
  },
  registerFunc: async (req, res) => {
    const { username, email, password } = req.body;
    const image = req.file?.path;

    let imageUrl = null;
    if (image) {
      const uploadResult = await cloudinaryUploader(image);
      imageUrl = uploadResult.url;
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
      image: imageUrl,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('token', token);
    res.redirect('/products');
  },
  loginPage: (req, res) => {
    res.render('login');
  },
  loginFunc: (req, res) => {
    res.redirect('/products');
  },
  logoutFunc: (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
  },
};

module.exports = { userRoutes };
