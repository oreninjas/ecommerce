const signJwt = (req, res, next) => {
  res.clearCookie('token');
  next();
};

module.exports = signJwt;
