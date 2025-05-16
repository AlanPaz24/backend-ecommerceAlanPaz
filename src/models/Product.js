import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: String,
  thumbnails: [String]
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
