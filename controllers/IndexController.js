var express = require('express');
var router = express.Router();
var Product = require('../models/products');

// Passport Authentication Library Reference
const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
module.exports = {
Index : function(request, response){
  response.render('index', {
    title: 'Buzz Ads',
    message: 'Buzz Ads - Classified Ads Application',
     user: request.user
  });
},

/* GET: /products */
Shop : function(request, response,next){
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        }
        else {
            response.render('shop', {
                title: 'Buzz Ads - Shop',
                products: products,
                 user: request.user
            });
        }
    });
},
// GET: /Signup
getsignup : function(request, response,next){
   response.render('signup', {
     title: 'SignUp',
       user: request.user
   });
},

// POST: /Signup
postsignup : function(request, response,next){
    User.register(new User({
        username: request.body.username
    }), request.body.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        //Redirect User to login page if user is not loggedin
          response.redirect('/signin');
      }
    });
},

// GET: /Signin
getsignin : function(request, response,next){

    let errormessages = request.session.messages || [];

    // clear the session messages
    request.session.messages = [];

    response.render('signin', {
        title: 'SignIn',
        messages: errormessages,
        user: request.user
    });
},

// POST: /Signin
postsignin : passport.authenticate('local', {
  successRedirect: '/',
    failureRedirect: '/signin',
    failureMessage: 'Invalid Login'
}),

// GET: /logout
logout : function(request, response,next){

    //Clear If there is any message in logged user's session
    request.session.messages = [];

    // CLose User session
    request.logout();

    //After session is clear for user redirect user to login again
    response.redirect('/signin');
}

}