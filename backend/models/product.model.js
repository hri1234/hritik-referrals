const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  price: String,
  category: String,
  images:String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);