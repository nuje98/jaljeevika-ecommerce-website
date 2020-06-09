const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
let Product = require('../models/product.model');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.route('/dashboard').get((req, res) => { 
  Product.find({}, function(err, data){
      res.render('dashboard.ejs', { 
         products : data
      });
  });
});

// Products Page
router.get('/product', ensureAuthenticated, (req, res) => res.render('product'));

module.exports = router;
