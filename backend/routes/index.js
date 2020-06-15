const express = require('express');
const router = express.Router();
const isUser = require('../middleware/is-user');
const isVendor = require('../middleware/is-vendor');
const apiMain = require('./api-main');
let Product = require('../models/product.model');

// Welcome Page
router.get('/', (req, res) => res.render('logreg'));

// User Dashboard
router.route('/dashboard').get(isUser,(req, res) => { 
  Product.find({}, function(err, data){
      res.render('dashboard', { 
         products : data.slice(0,6)
      });
  });
});

// Vendor Dashboard
router.get('/vendordashboard',isVendor, (req, res) => res.render('Vendordashboard'));

// Services
router.get('/services',isUser, (req, res) => res.render('services'));

// About Us
router.get('/aboutus',isUser, (req, res) => res.render('aboutus'));

// Contact us
router.get('/contactus',isUser, (req, res) => res.render('contactus'));

// Api main
router.use('/api/main', apiMain);

module.exports = router;
