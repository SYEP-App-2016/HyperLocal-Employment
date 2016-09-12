var passport = require('passport'),
    Account = require('../models/account'),
    User = require('../models/user'),
    Company = require('../models/company'),
    express = require('express'),
    router = express.Router(),
    utility = require('../utility');

router.get('/Signup', utility.isNotLoggedIn, function(req, res){
    res.render('Auth/Signup.ejs', {message: req.flash('signupMessage'), user: req.user});
});

router.post('/Signup', passport.authenticate('local-signup', {
    successRedirect: '/Auth/Steps',
    failureRedirect: '/Auth/Signup',
    failureFlash: true
}));

router.get('/Steps', function(req, res){
    res.render('member/newUser.ejs', {user: req.user});
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

router.get('/Login', utility.isNotLoggedIn, function(req, res){
    res.render('auth/login.ejs', {message: req.flash('loginMessage'), user: req.user});
});

router.post('/Login', passport.authenticate('local-login', {
    failureRedirect: '/Auth/Login',
    failureFlash: true
}), function(req, res){
    switch (req.user.roleID) {
        case 1:
            res.redirect('/'); //Gonna be Business page in future
            break;
        case 2:
            res.redirect('/Admin');
            break;
        default:
            res.redirect('/Member/Profile');
            break;
    }
});

router.get('/Logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
