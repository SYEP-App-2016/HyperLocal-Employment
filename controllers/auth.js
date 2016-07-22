var passport = require('passport'),
    Account = require('../models/account'),
    express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/register', function(req, res){
    res.render('signup', {message: req.flash('signupMessage')});
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/newUser',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/login', function(req, res){
    res.render('login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
