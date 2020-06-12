const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const apiMain = require('./api-main');
let Product = require('../models/product.model');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('logreg'));

// Dashboard
router.route('/dashboard').get((req, res) => { 
  Product.find({}, function(err, data){
      res.render('dashboard.ejs', { 
         products : data.slice(0,6)
      });
  });
});

// Products Page
router.get('/product', ensureAuthenticated, (req, res) => res.render('product'));

// Api main
router.use('/api/main', apiMain);

module.exports = router;
