const catModel = require('../models/category.model');
const MyError = require('../helper/MyError.helper');
const sha256 = require('js-sha256');

module.exports = {
    // [GET] /category/
    home: async (req, res, next) => {
        let catList = [];
        try {
            catList = await catModel.all();
            console.log('catList', catList);

            res.render('pages/category/home', {
                title: 'Home',
                catList: catList,
            });
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    add: async (req, res, next) => {
        res.render('pages/category/cat-add', { layout: 'main' });
    },
    // [POST] /category/add
    addPost: async (req, res, next) => {
        try {
            const cat = req.body;
            const result = await catModel.add(cat);
            console.log(result);
            return res.redirect('/category');
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    // [GET] /category/edit/:id
    edit: async (req, res, next) => {
        try {
            const id = req.params.id;
            const cat = await catModel.one(id);
            if (cat.length === 0) {
                throw new MyError(404, 'Category not found');
            } else if (cat.length > 1) {
                throw new MyError(500, 'Database error, duplicate category ID');
            }

            res.render('pages/category/cat-edit', {
                title: 'Edit',
                cat: cat,
                layout: 'main'
            });
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    // [POST] /category/edit/:id
    editPost: async (req, res, next) => {
        try {

            const catId = req.params.id;
            const catName = req.body.CatName;
            const result = await catModel.update(catId, { CatID: catId, CatName: catName });
            return res.redirect('/category');
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    // [POST] /category/delete/:id
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await catModel.delete(id);
            return res.redirect('/category');
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    }
};



