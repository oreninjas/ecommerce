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
    const user = req.user;
    const isClientAdmin = user.isAdmin === true;
    const page = req.query.p || 0;
    const items = 5;
    let products = await productModel
      .find()
      .skip(page * items)
      .limit(5);

    res.render('products', { product: products, user });
  },
  eachProductPage: async (req, res) => {
    const productId = req.params.id;
    let product = await productModel.findOne({ _id: productId });

    res.render('eachProduct', { product });
  },
  basketPage: async (req, res) => {
    const user = req.user;

    let productDetails = await productModel.find({ _id: user.basket });

    res.render('basket', { products: productDetails });
  },
  searchSuggestions: async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    try {
      const results = await productModel
        .find({
          title: { $regex: query, $options: 'i' },
        })
        .limit(3);

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  },
  addToCart: async (req, res) => {
    const productId = req.params.id;
    const user = req.user;

    try {
      let dbUser = await userModel.findOne({ _id: user._id });
      await dbUser.basket.push(productId);
      await dbUser.save();
    } catch (error) {
      console.log('Error occured while adding products to cart !! ', error);
    }
  },
  eachProductRemoverFunc: async (req, res) => {
    const productId = req.params.id;
    const user = req.user;

    let dbUser = await userModel.findOne({ _id: user._id });
    await dbUser.basket.pop(productId); // i wanna delete product
    await dbUser.save();
    res.redirect('/basket');
  },
};

module.exports = { product };
