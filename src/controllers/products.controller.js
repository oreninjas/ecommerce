const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const cloudinary = require('../utils/cloudinary');
const jwt = require('jsonwebtoken');

const product = {
  createPage: (req, res) => {
    res.render('createProduct');
  },
  createFunc: async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file?.path;

    try {
      let response = await cloudinary(image);
      let imgUrl = response.url;

      let userFromMiddleware = req.user;
      let product = await productModel.create({
        createdBy: userFromMiddleware._id,
        title,
        description,
        price,
        image: imgUrl,
      });

      let userId = req.cookies.token;
      let verifiedUser = jwt.verify(userId, process.env.JWT_SECRET);
      if (!verifiedUser) {
        return res.redirect('/');
      }

      let dbUser = await userModel.findOne({ _id: verifiedUser._id });
      await dbUser.findOneAndUpdate(
        { _id: verifiedUser._id },
        { $push: { posts: product._id } },
        { new: true },
      );

      return res.redirect('/products');
    } catch (error) {
      console.log('Error occured while uploading img to cloudinary !! ', error);
      res.redirect('/products');
    }
  },
  productsPage: async (req, res) => {
    res.render('products');
  },
  productsFunc: async (req, res) => {
    let products = await productModel.find().limit(10);
    res.json({ products }); // Delete this and pass on Products Page products variable.
  },
};

module.exports = { product };
