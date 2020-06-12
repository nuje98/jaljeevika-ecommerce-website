const express = require('express');
const router = express.Router();
const authController = require('../controllers/vendor');
const isAuth = require('../middleware/is-auth');

//Vendor home route
router.get('/', authController.getHome);

//login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

//signup routes
router.get('/register', authController.getSignup);
router.post('/register', authController.postSignup);

//send route
router.post('/send', isAuth, authController.postSend);

//logout routes
router.get('/logout', isAuth, authController.logout);

//contact routes
router.get('/contact', isAuth, authController.getContact);
router.post('/contact', isAuth, authController.postContact);

module.exports = router;
