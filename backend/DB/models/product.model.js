import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name must be less than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  images: {
    type: [String],
    validate: {
      validator: function (array) {
        return array.every(url => typeof url === 'string');
      },
      message: 'Each image must be a URL string',
    },
    default: [],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller reference is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
