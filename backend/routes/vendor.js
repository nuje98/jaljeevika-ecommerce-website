const express = require('express');
const router = express.Router();
const authController = require('../controllers/vendor');
const isVendor = require('../middleware/is-vendor');

//Vendor home route
router.get('/', authController.getHome);

//login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

//signup routes
router.get('/register', authController.getSignup);
router.post('/register', authController.postSignup);

//send route
router.post('/send', isVendor, authController.postSend);

//logout routes
router.get('/logout', isVendor, authController.logout);

//contact routes
router.get('/contact', authController.getContact);
router.post('/contact', authController.postContact);

//product routes
router.get('/addProduct', authController.getAddProduct);
router.get('/myProducts', authController.getProducts);

module.exports = router;
