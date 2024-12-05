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

      let user = req.user;
      let product = await productModel.create({
        createdBy: user._id,
        title,
        description,
        price,
        image: imgUrl,
      });

      let dbUser = await userModel.findOne({ _id: user._id });
      await dbUser.posts.push(product._id);
      await dbUser.save();

      return res.redirect('/products');
    } catch (error) {
      console.log(
        'Error occured while uploading img to cloudinary check product controller !!! ',
        error,
      );
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
