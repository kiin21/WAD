const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route');
const categoryRoutes = require('./category.route');
const MyError = require('../helper/MyError.helper');

const errorHandler = (err, req, res, next) => {
    res.status(500).render('error', {
        title: 'Error',
        statusCode: err.statusCode,
        message: err.message,
        description: err.description,
        layout: false
    });
};

// Use the user routes
router.use('/user', userRoutes);

// Use the category routes
router.use('/category', categoryRoutes);

// Handle unexpected routes
router.get('/*', (req, res, next) => {
    return next(new MyError(404, 'Page not found'));
});

// Error handler
router.use(errorHandler);

module.exports = router;