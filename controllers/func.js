module.exports = {
    isLoggedIn: function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) return next();
            res.redirect('/');
        }
}
