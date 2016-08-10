module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated() && req.user.roleID == 1) 
            return next();
        res.redirect('/');
    }
};