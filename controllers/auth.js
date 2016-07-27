var passport = require('passport'),
    Account = require('../models/account'),
    express = require('express'),
    router = express.Router();

router.get('/register', function(req, res){
    res.render('signup', {message: req.flash('signupMessage')});
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/newUser',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/registerCompany', function(req, res){
    res.render('companySignUp', {message: req.flash('signUpMessage')});
});

router.post('/registerCompanyAccount', passport.authenticate('local-signup', {
    successRedirect: '/newCompany',
    failureRedirect: '/registerCompany',
    failureFlash: true
}));

router.get('/login', function(req, res){
    res.render('login', {message: req.flash('loginMessage')});
});

// router.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res){
    if(req.user.roleID == 0) res.redirect('/profile');
    if(req.user.roleID == 1) res.redirect('/company');
});

// router.post('/login', passport.authenticate('local-login'), function(err, req, res){
//     // if(!req.user) res.redirect('/login');
//     if(err)
//     if(req.user.roleID == 0) res.redirect('/profile');
//     if(req.user.roleID == 1) res.redirect('/company');
// })


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
