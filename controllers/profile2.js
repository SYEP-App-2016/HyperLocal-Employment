var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');



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
