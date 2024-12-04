const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const sessionCheck = require('../middlewares/sessionCheck.middleware');
const noCache = require('../middlewares/noCache.middleware');

// Public routes
router.get('/login', userController.login);
router.get('/signup', userController.signup);
router.post('/register', userController.addPost);
router.post('/auth', userController.postAuth);

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Clear the cookie
        res.redirect('/user/login');
    });
});

// No-cache middleware
router.use(noCache);

// Session check middleware
router.use(sessionCheck);

// Protected routes
router.get('/', userController.home);

module.exports = router;