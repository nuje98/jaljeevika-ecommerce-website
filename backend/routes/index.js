const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const apiMain = require('./api-main');
let Product = require('../models/product.model');

// Welcome Page
router.get('/', (req, res) => res.render('logreg'));

// User Dashboard
router.route('/dashboard').get(isAuth,(req, res) => { 
  Product.find({}, function(err, data){
      res.render('dashboard', { 
         products : data.slice(0,6)
      });
  });
});

// Vendor Dashboard
router.get('/vendordashboard', isAuth, (req, res) => res.render('Vendordashboard'));

// Api main
router.use('/api/main', apiMain);

module.exports = router;
