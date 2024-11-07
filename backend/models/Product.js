import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: { type: Number }, 
  category: String,
  sold: Boolean,
  dateOfSale: Date,
  image: String,
});


const Product = mongoose.model('Product', productSchema);

export default Product;
