const express = require('express');
const router = express.Router();
const catController = require('../controllers/category.controller');
const sessionCheck = require('../middlewares/sessionCheck.middleware');
const noCache = require('../middlewares/noCache.middleware');

// No-cache middleware
router.use(noCache);

// Session check middleware
router.use(sessionCheck);

// Protected routes
router.get('/', catController.home);
router.get('/add', catController.add);
router.post('/add', catController.addPost);
router.post('/delete/:id', catController.delete);
router.get('/edit/:id', catController.edit);
router.post('/edit/:id', catController.editPost);

module.exports = router;