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
    successRedirect: '/Register/Steps',
    failureRedirect: '/Register/Signup',
    failureFlash: true
}));

router.get('/Steps', function(req, res){
    res.render('member/steps', {user: req.user});
});

router.post('/newUser', function(req, res){
    userData = JSON.parse(req.body.userData);
    var newUser = new User(userData);
    newUser.acc_id = req.user._id;
    newUser.save(function(err){
        if(err){console.log(err)}
        else{console.log('User Created!')}
    });
    utility.addUserExperience(JSON.parse(req.body.expData), newUser);
    utility.addUserEducation(JSON.parse(req.body.eduData), newUser);
    utility.addUserVolunteerExperience(JSON.parse(req.body.volData), newUser);
    res.redirect('/member/profile');
});

router.get('/Login', function(req, res){
    res.render('auth/login', {message: req.flash('loginMessage'), user: req.user});
});

router.post('/Login', passport.authenticate('local-login', {
    failureRedirect: 'Login',
    failureFlash: true
}), function(req, res){
    if(req.user.roleID == 0){
        User.findOne({acc_id: req.user._id}, function(err, user){
            if(!user){res.redirect('/newUser');}
            else{res.redirect('/Member/Profile');}
        });
    } else if(req.user.roleID == 1){
        Company.findOne({acc_id: req.user._id}, function(err, company){
            if(!company){res.redirect('/newCompany');}
            else{res.redirect('/company');}
        });
    }
});


router.get('/Logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
