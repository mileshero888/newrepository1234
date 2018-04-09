var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var IndexController = require('../controllers/IndexController');

/* Route Defined For HomePage */
router.get('/', IndexController.Index);

/* Route Defined For ShopPage */
router.get('/shop', IndexController.Shop);

/* Route Defined For Signup */
router.get('/signup', IndexController.getsignup);

/* Route Defined For Signup */
router.post('/signup', IndexController.postsignup);

/* Route Defined For Signin Page */
router.get('/signin', IndexController.getsignin);

/* Route Defined For SignIn Page */
router.post('/signin', IndexController.postsignin);

/* Route Defined For Logout Page */
router.get('/logout', IndexController.logout);

module.exports = router;
