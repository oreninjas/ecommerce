const cloudinary = require('cloudinary').v2;
const { Router } = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
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
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token);
  res.redirect('/home');
});

module.exports = router;
