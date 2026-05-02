import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, required: true },
  images: [{ type: String }], // Base64 strings will be stored here
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
