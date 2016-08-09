var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');
    // MOVED FROM REGISTRATION
    passport = require('passport'),
    Account = require('../models/account'),
    Company = require('../models/company');

router.get('/Signup', function(req, res){
    res.render('Member/signup', {message: req.flash('signupMessage'), user: req.user});
});

router.post('/Signup', passport.authenticate('local-signup', {
    successRedirect: 'Member/newUser',
    failureRedirect: 'Member/register',
    failureFlash: true
}));


router.get('/Login', function(req, res){
    res.render('Member/login', { message: req.flash('loginMessage'), user: req.user} );
});

router.post('/Login', passport.authenticate('local-login', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res){
    if(req.user.roleID == 0){
        User.findOne({acc_id: req.user._id}, function(err, user){
            if(!user){res.redirect('/newUser');}
            else{res.redirect('/profile');}
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





// REDESIGN LOGIC OR MODEL TO CONTAIN EVERYTHING IN ONE DOC
router.get('/Profile', isLoggedIn, function(req, res){
    if(req.user.roleID == 1){res.redirect('/company');}
    //res.render('profile', {user: req.user});
    var o = {edu: [],vol: [],exp: [],usr: {}};
    User.findOne({acc_id: req.user.id}, function(err, user){
        if(err) throw err;
        console.log(user);
        o.usr = user;
        getEducation();
    });
    function getEducation(){
        Education.find({profile_id: req.params.id}, function(err, edu){
            if(err) throw err;
            o.edu = edu;
            getVolunteerExperience();
        });
    };

    function getVolunteerExperience(){
        Volunteer.find({profile_id: req.params.id}, function(err, vol){
            if(err) throw err;
            o.vol = vol;
            getExperience();
        });
    };

    function getExperience(userResult, eduResult, volResult){
        Experience.find({profile_id: req.params.id}, function(err, exp){
            o.exp = exp;
            res.render('profile', {
                results: o,
                user: req.user
            });
        })
    }

});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = router;
