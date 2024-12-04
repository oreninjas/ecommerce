const { mongoose, Schema } = require('mongoose');

const productSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: [true, 'Title is required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    image: {
      type: String,
      // required: [true, 'Atleast 1 picture is required!'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('product', productSchema);
