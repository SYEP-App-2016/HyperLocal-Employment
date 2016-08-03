var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js');

//Add/Remove Routes for User Experience
router.post('/addExperience', function(req, res){
    //res.send(dbFunctions.addExperience(req.body));
    //Remember to include ._id as an hidden field to get user_id
    var newExperience = new Experience({
        job_position: req.body.job_position,
        job_description: req.body.job_description,
        company_name: req.body.company_name,
        prof_id: req.user._id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    });
    console.log(newExperience);
    newExperience.save(function(err){if(err)throw err; console.log('User Experience Added.')});
    res.redirect('/Profile');
});
// router.post('/removeExperience', function(req, res){
//     Experience.find({_id: req.body.exp_id}, function(err, exp){
//         if(err) throw err;
//         console.log(exp);
//         exp = exp[0];
//         console.log(exp);
//         exp.remove(function(err){
//             if(err) throw err;
//             console.log('User Experience Removed!');
//         });
//     });
//     res.redirect('/Profile');
// });
//Add/Remove Routes for Education
router.post('/addEducation', function(req, res){
    // res.send(dbFunctions.addEducation(req.body));
    //Remember to include ._id as an hidden field to get user_id
    var newEducation = new Education({
        instit_name: req.body.name_of_institution,
        deg: req.body.degree,
        yr_grad: req.body.year_graduated,
        f_study: req.body.field_of_study,
        instit_type: req.body.type_of_institution,
        prof_id: req.user._id
    });
    newEducation.save(function(err){if(err)throw err; console.log('User Education Added.')});
    res.redirect('/Profile');
});
// router.post('/removeEducation', function(req, res){
//     Education.find({_id: req.body.edu_id}, function(err, edu){
//         if(err) throw err;
//         edu = edu[0];
//         edu.remove(function(err){
//             if(err) throw err;
//             console.log('User Education Removed!');
//         });
//     });
//     res.redirect('/' + req.params.id + '/Profile');
// });
//Add/Remove Routes for Volunteer Experience
router.post('/addVolunteerExp', function(req, res){
    // res.send(dbFunctions.addVolunteer(req.body));
    //Remember to include ._id as an hidden field to get user_id
    var newVolunteer = new Volunteer({
        organization: req.body.organization,
        role: req.body.role,
        cause: req.body.cause,
        description: req.body.description,
        prof_id: req.user._id
    });
    newVolunteer.save(function(err){if(err)throw err; console.log('User Volunteer Added.')});
    res.redirect('/Profile');
});
// router.post('/removeVolunteerExp', function(req, res){
//     Volunteer.find({_id: req.body.vol_id}, function(err, vol){
//         if(err) throw err;
//         vol = vol[0];
//         vol.remove(function(err){
//             if(err) throw err;
//             console.log('User Volunteer Experience Removed!');
//         });
//     });
//     res.redirect('/Profile');
// });

module.exports = router;
