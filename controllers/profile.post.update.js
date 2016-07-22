var express = require('express'),
    router = express.Router(),
    Account = require('../models/account.js'),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');

router.post('/:id/updateUser', function(req, res){
    var data = req.body;
    User.find({_id:req.params.id}, function(err, user){
        user = user[0];
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.middle_init = data.middle_init;
        user.save(function(err){if(err) throw err;console.log('User Updated');});
        res.send(user);
    });
});

router.post('/:id/updateEducation', function(req, res){
    data = req.body; //remember to add hidden field to find education id
    Education.find({_id: data._id}, function(err, edu){
        var edu = edu[0];
        edu.name_of_institution = data.name_of_institution;
        edu.degree = data.degree;
        edu.year_graduated= data.year_graduated;
        edu.field_of_study= data.field_of_study;
        edu.type_of_institution= data.type_of_institution;
        edu.save(function(err){if(err) throw err;console.log('User Education Updated');});
        res.send(edu);
    });
});

router.post('/:id/updateExperience', function(req, res){
    data = req.body; //remember to add hidden field to find experience id
    //  console.log(data);
    Experience.find({_id: data._id}, function(err, exp){
        var exp = exp[0];
        console.log(exp);
        exp.job_position = data.job_position;
        exp.job_description = data.job_description;
        exp.company_name = data.company_name;
        exp.save(function(err){if(err) throw err;console.log('User Experience Updated');});
        res.send(exp);
    });
});

router.post('/:id/updateVolunteerExp', function(req, res){
    data = req.body; //remember to add hidden field to find volunteer experience id
    Volunteer.find({_id: data._id}, function(err, vol){
        var vol = vol[0];
        vol.organization= data.organization;
        vol.role= data.role;
        vol.cause= data.cause;
        vol.description= data.description;
        vol.how_long= data.how_long;
        vol.save(function(err){if(err) throw err;console.log('User Volunteer Updated');});
        res.send(vol);
    });
});

module.exports = router;
