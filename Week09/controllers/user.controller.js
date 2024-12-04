const usersModel = require('../models/user.model');
const MyError = require('../helper/MyError.helper');
const sha256 = require('js-sha256');

module.exports = {
    // [GET] /user
    home: async (req, res, next) => {
        let usersList = [];
        try {
            usersList = await usersModel.all();

            const users = usersList
            res.render('home', {
                title: 'Home',
                users: users,
            });
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    // [GET] /user/register
    signup: async (req, res, next) => {
        res.render('pages/user/signup', { layout: 'login-signup' });
    },
    // [POST] /user/register
    addPost: async (req, res, next) => {
        try {
            const user = req.body;
            const originPassword = user.Password;

            const salt = (new Date()).getTime().toString();
            const hashedPassword = sha256(originPassword + salt);
            user.Password = hashedPassword + salt;
            const result = await usersModel.add(user);
            return res.redirect('/user/login');
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
    // [GET] /user/login
    login: async (req, res, next) => {
        res.render('pages/user/login', { layout: 'login-signup' });
    },
    // [POST] user/auth
    postAuth: async (req, res, next) => {
        try {
            const user = req.body;
            console.log('Before, ', user);

            const dbUser = await usersModel.any(user.Username);
            console.log(dbUser);

            if (!dbUser) {
                console.log('User not found');
                return res.redirect('/user/login');
            }

            for (const item of dbUser) {
                const salt = item.Password.slice(-13);
                const hashedPassword = sha256(user.Password + salt);
                console.log(hashedPassword + salt);
                console.log(item.Password);

                if (hashedPassword + salt === item.Password) {
                    console.log('Auth successfully');
                    req.session.user = item;
                    console.log('Session: ', req.session.user);

                    return res.redirect('/user');
                }
            }
            return res.redirect('/user/login');
        } catch (error) {
            return next(new MyError(500, error.message, error.stack));
        }
    },
};



