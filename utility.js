var Education = require('./models/education'),
    Experience = require('./models/experience'),
    Volunteer = require('./models/volunteer');

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated())
            return next();
        res.redirect('/');
    },
    addAllUserEducation: function(eduData, user){
        for(var i = 0; i < eduData.length; i++){
            var edu = new Education(eduData[i]);
            edu.prof_id = user._id;
            edu.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Education added!')}
            });
        }
    },
    addAllUserExperience: function(expData, user){
        for(var i = 0; i < expData.length; i++){
            var exp = new Experience(expData[i]);
            exp.prof_id = user._id;
            exp.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Experience added!')}
            });
        }
    },
    addAllUserVolunteerExperience: function(volData, user){
        for(var i = 0; i < volData.length; i++){
            var vol = new Volunteer(volData[i]);
            vol.prof_id = user._id;
            vol.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Volunteer Experience added!')}
            });
        }
    }
};
