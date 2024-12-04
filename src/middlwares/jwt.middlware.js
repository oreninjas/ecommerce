const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

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

    req.user = user;

    res.cookie('token', signJwt);
    return next();
  } catch (error) {
    console.log('Error while logging in!!', error);
    return res.redirect('/login');
  }
};

const tokenVerify = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect('/login');
  }

  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(isVerified._id).select('-password');
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

module.exports = { loginJwt, tokenVerify };
