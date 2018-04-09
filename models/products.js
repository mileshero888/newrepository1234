const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    'ProductName': {
        type: String,
        required: 'Product Name is required'
    },
    'Price': {
        type: Number,
        required: 'Product Price is required'
    },
    'Description': {
        type: String,
        required: 'Product Description is Required'
    }
});

module.exports = mongoose.model('Products', ProductSchema);