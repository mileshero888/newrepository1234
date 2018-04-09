const express = require('express');
const router = express.Router();
const Product = require('../models/products');


module.exports = {

// GET: /products - My Products List
Index : function(request, response,next){
 Product.find((err, products) => {
        if (err) {
            console.log(err);
        }
        else {
            response.render('Products/index', {
                title: 'Products List',
                products: products,
                user: request.user
            });
        }
    });   
},

// GET: /products/add - Add New Product
getadd : function(request, response,next){
    response.render('products/add', {
        title: 'Add a New Product',
        user: request.user
    });
},

// POST: /products/add 
postadd : function(request, response,next){
    Product.create({
        ProductName: request.body.ProductName,
        Price: request.body.Price,
        Description: request.body.Description
    }, (err, product) => {
        if (err) {
            console.log(err);
        }
        else {
            response.redirect('/products');
        }
    });
},
// GET: /products/edit - Edit Product Details
getedit : function(request, response,next){
     let ProductID = request.params._id;

    Product.findById(ProductID, (err, product) => {
        if (err) {
            console.log(err);
        }
        else {
            response.render('products/edit', {
                title: 'Product Details',
                product: product,
                user: request.user
            });
        }
    });
},
// POST: /products/edit
postedit : function(request, response,next){
   let ProductID = request.params._id;

    Product.update({ _id: ProductID },
        { $set: {
                ProductName: request.body.ProductName,
                Price: request.body.Price,
                Description: request.body.Description
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                response.redirect('/products');
            }
        });
},
//Get: /products/delete - Delete Product
deleteproduct : function(request, response,next){
     let ProductID = request.params._id;
    Product.remove({ _id: ProductID }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            response.redirect('/products');
        }
    });
}
}