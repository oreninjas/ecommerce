const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const cloudinary = require('../utils/cloudinary');

const product = {
  createPage: (req, res) => {
    res.render('createProduct');
  },
  createFunc: async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file?.path;
    // if (!image) {
    //   return res.redirect('/products');
    // }

    try {
      // let imgUrl = null;
      // if (imgUrl) {
      //   let response = await cloudinary(image);
      //   imgUrl = response.url;
      // }
      let userFromMiddleware = req.user;

      let product = await productModel.create({
        createdBy: userFromMiddleware._id,
        title,
        description,
        price,
        // image: imgUrl,
      });

      let userId = req.cookies.token?._id;
      if (!userId) {
        return res.redirect('/login');
      }

      let dbUser = await userModel.findOne({ userId });
      dbUser.findOneAndUpdate(
        { _id },
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
    res.render('products')
  },
  productsFunc: async (req, res) => {
    let products = await productModel.find().limit(10);
    res.json({ products }); // Delete this and pass on Products Page products variable.
  },
};

module.exports = { product };
