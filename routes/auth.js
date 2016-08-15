var passport = require('passport'),
    Account = require('../models/account'),
    User = require('../models/user'),
    Company = require('../models/company'),
    express = require('express'),
    router = express.Router(),
    utility = require('../utility');

router.get('/Signup', function(req, res){
    res.render('Auth/Signup', {message: req.flash('signupMessage'), user: req.user});
});

router.post('/Signup', passport.authenticate('local-signup', {
    successRedirect: '/Auth/Steps',
    failureRedirect: '/Auth/Signup',
    failureFlash: true
}));

router.get('/Steps', function(req, res){
    res.render('member/newUser');
});

router.post('/newUser', function(req, res){
    data = req.body;
    var newUser = new User(data.user);
    newUser.acc_id = req.user._id;
    newUser.save(function(err){
        if(err){console.log(err)}
        else{console.log('User Created!')}
    });
    utility.addAllUserExperience(data.exp, newUser);
    utility.addAllUserEducation(data.edu, newUser);
    utility.addAllUserVolunteerExperience(data.vol, newUser);
    res.redirect('/member/profile');
});

router.get('/Login', function(req, res){
    res.render('auth/login', {message: req.flash('loginMessage')});
});

router.post('/Login', passport.authenticate('local-login', {
    failureRedirect: '/Auth/Login',
    failureFlash: true
}), function(req, res){
    res.redirect('/Member/Profile');
});


router.get('/Logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
