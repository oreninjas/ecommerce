const { Schema, mongoose, Types } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  basket: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product',
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', userSchema);
