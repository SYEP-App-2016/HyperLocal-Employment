var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js'),
    // MOVED FROM REGISTRATION
    passport = require('passport'),
    Account = require('../models/account'),
    Company = require('../models/company');

///////////////////////////////////////////////////////////////////////
////////  CREATE //////////////////////////////////////////////
///////////////////////////////////////////////////////

router.post('/addExperience', function(req, res){
    //res.send(dbFunctions.addExperience(req.body));
    //Remember to include ._id as an hidden field to get user_id
    var newExperience = new Experience({
        jb_position: req.body.job_position,
        jb_description: req.body.job_description,
        company_name: req.body.company_name,
        prof_id: req.user._id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
    });
    console.log(newExperience);
    newExperience.save(function(err){if(err)throw err; console.log('User Experience Added.')});
    res.redirect('/Member/Profile');
});

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
    res.redirect('/Member/Profile');
});

router.post('/addVolunteerExp', function(req, res){
    // res.send(dbFunctions.addVolunteer(req.body));
    //Remember to include ._id as an hidden field to get user_id
    var newVolunteer = new Volunteer({
        org: req.body.organization,
        role: req.body.role,
        cause: req.body.cause,
        desc: req.body.description,
        prof_id: req.user._id
    });
    newVolunteer.save(function(err){if(err)throw err; console.log('User Volunteer Added.')});
    res.redirect('/Member/Profile');
});

///////////////////////////////////////////////////////////////////////
////////  READ  //////////////////////////////////////////////
///////////////////////////////////////////////////////

// REDESIGN LOGIC OR MODEL TO CONTAIN EVERYTHING IN ONE DOC
router.get('/Profile', isLoggedIn, function(req, res){
    if(req.user.roleID == 1){res.redirect('/company');}
    //res.render('profile', {user: req.user});
    var o = {edu: [],vol: [],exp: [],usr: {}};
    console.log(req.user.id);
    User.findOne({acc_id: req.user.id}, function(err, user){
        if(err) throw err;
        console.log(user);
        o.usr = user;
        getEducation();
    });
    function getEducation(){
        Education.find({prof_id: o.usr._id}, function(err, edu){
            if(err) throw err;
            o.edu = edu;
            getVolunteerExperience();
        });
    };

    function getVolunteerExperience(){
        Volunteer.find({prof_id: o.usr._id.id}, function(err, vol){
            if(err) throw err;
            o.vol = vol;
            getExperience();
        });
    };

    function getExperience(userResult, eduResult, volResult){
        Experience.find({prof_id: o.usr._id.id}, function(err, exp){
            o.exp = exp;
            res.render('Member/index', {
                results: o,
                user: req.user
            });
            console.log(o);
        })
    }

});

///////////////////////////////////////////////////////////////////////
////////  UPDATE //////////////////////////////////////////////
///////////////////////////////////////////////////////
/*
router.get('/Update/Experience/:id', function(req, res){
    Experience.findOne({_id: req.params.id}, function(err, exp){
        if(err){console.log(err)}
        res.render('Member/edit', {
            user: req.user,
            results: exp
        })
    })
})

router.post('/Update/Experience/:id', function(req, res){
    Experience.findOneAndUpdate({_id: req.params.id}, req.body, function(err){
        if(err){console.log(err)}
        else{console.log('User Experience Updated!')}
        res.redirect('/Member/Profile');
    });
});

router.get('/Update/Education/:id', function(req, res){
    Education.findOne({_id: req.params.id}, function(req, res){
        if(err){console.log(err)}
        res.render('Member/edit', {
            user: req.user,
            results: exp
        })
    })
})

router.post('/Update/Education/:id', req.body, function(req, res){
    Education.findOneAndUpdate({_id: req.params.id}, req.body, function(err){
        if(err){console.log(err)}
        else{console.log('User Education Updated!')}
        res.redirect('/Member/Profile');
    })
})

router.get('/Update/VolunteerExperience/:id', req.body, function())

router.post('/Update/VolunteerExperience/:id', req.body, function(req, res){
    Volunteer.findOneAndUpdate({_id: req.params.id}, req.body, function(err){
        if(err){console.log(err)}
        else{console.log('User.Education Updated!')}
        res.redirect('/Member/Profile');
    })
})
*/

///////////////////////////////////////////////////////////////////////
////////  DELETE //////////////////////////////////////////////
///////////////////////////////////////////////////////

router.post('/removeExperience', function(req, res){
    Experience.findOneAndRemove({_id: req.body.exp_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Experience Removed!')}
        res.redirect('/Member/Profile');
    });
});

router.post('/removeEducation', function(req, res){
    Education.findOneAndRemove({_id: req.body.edu_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Education Removed!')}
        res.redirect('/Member/Profile');
    });
});

router.post('/removeVolunteerExp', function(req, res){
    Volunteer.findOneAndRemove({_id: req.body.vol_id}, function(err){
        if(err){console.log(err)}
        else{console.log('User Volunteer Removed!')}
        res.redirect('/Member/Profile');
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = router;
