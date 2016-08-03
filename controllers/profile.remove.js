var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');

router.post('/removeExperience', function(req, res){
    Experience.findOneAndRemove({_id: req.body.exp_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Experience Removed!')}
        res.redirect('profile');
    });
});

router.post('/removeEducation', function(req, res){
    Education.findOneAndRemove({_id: req.body.edu_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Education Removed!')}
        res.redirect('profile');
    });
});

router.post('/removeVolunteerExp', function(req, res){
    Volunteer.findOneAndRemove({_id: req.body.vol_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Volunteer Removed!')}
        res.redirect('profile');
    });
});

module.exports = router;
