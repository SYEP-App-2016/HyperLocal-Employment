var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');

router.get('/Profile', isLoggedIn, function(req, res){
        res.render('profile', {user: req.user});

    // var o = {edu: [],vol: [],exp: [],usr: {}};
    //
    // console.log(req.params.id);
    // User.find({_id: req.params.id}, function(err, user){
    //     if(err) throw err;
    //     o.usr = user[0];
    //     getEducation();
    // });
    //
    // function getEducation(){
    //     Education.find({profile_id: req.params.id}, function(err, edu){
    //         if(err) throw err;
    //         o.edu = edu;
    //         getVolunteerExperience();
    //     });
    // };
    //
    // function getVolunteerExperience(){
    //     Volunteer.find({profile_id: req.params.id}, function(err, vol){
    //         if(err) throw err;
    //         o.vol = vol;
    //         getExperience();
    //     });
    // };
    //
    // function getExperience(userResult, eduResult, volResult){
    //     Experience.find({profile_id: req.params.id}, function(err, exp){
    //         o.exp = exp;
    //         res.render('profile', {
    //             page: 'profile',
    //             results: o
    //         });
    //         //res.send({result: o});
    //     })
    // }

});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = router;
