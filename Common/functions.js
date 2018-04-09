// Common functions
module.exports = {
    checkloggedIn: (req, res, next) => {
      if (req.user) {
        next();
    } else {
        res.redirect('/signin');
    }
    }
};


