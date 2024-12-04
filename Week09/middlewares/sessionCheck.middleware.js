module.exports = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        console.log('local user', res.locals.user);
        return next();
    }
    res.redirect('/user/login');
};