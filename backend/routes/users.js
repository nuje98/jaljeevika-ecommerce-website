const express = require('express');
const router = express.Router();
const authController = require('../controllers/users');
const isAuth = require('../middleware/is-auth');

//User home route
router.get('/', authController.getHome);

//login routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

//signup routes
router.get('/register', authController.getSignup);
router.post('/register', authController.postSignup);

//logout routes
router.get('/logout', isAuth, authController.logout);

module.exports = router;
