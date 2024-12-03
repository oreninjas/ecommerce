const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const signOutJwt = (req, res, next) => {
  res.clearCookie('token');
  next();
};

const autoRedirect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.redirect('/login');
    }
    let { _id, email } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await userModel.findOne({ _id, email });
    if (!user) {
      return res.redirect('/login');
    }
    console.log('User found: ', user);
    req.user = user;

    return next();
  } catch (error) {
    console.log('Error while getting user cookie !! ', error);
  }
};

const loginJwt = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect('/');
  }

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.redirect('/');
    }

    let isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.redirect('/');
    }

    const signJwt = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', signJwt);

    return next();
  } catch (error) {
    console.log('Error while logging in!!', error);
    return res.redirect('/login');
  }
};

module.exports = { loginJwt, autoRedirect, signOutJwt };
