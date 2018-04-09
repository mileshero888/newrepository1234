var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../Common/functions');

var ProductsController = require('../controllers/ProductsController');

/* Route Defined For Product List Page */
router.get('/',config.checkloggedIn, ProductsController.Index);

/* Route Defined For Add Products */
router.get('/add',config.checkloggedIn, ProductsController.getadd);

/* Route Defined For Add Products Post */
router.post('/add',config.checkloggedIn, ProductsController.postadd);

/* Route Defined For Delete Product */
router.get('/delete/:_id',config.checkloggedIn, ProductsController.deleteproduct);

/* Route Defined For Edit Product */
router.get('/edit/:_id',config.checkloggedIn, ProductsController.getedit);

/* Route Defined For Edit Product Post */
router.post('/edit/:_id',config.checkloggedIn, ProductsController.postedit);

module.exports = router;
