var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    Experience = require('../models/experience.js'),
    Education = require('../models/education.js'),
    Volunteer = require('../models/volunteer.js'),
    utility = require('../utility.js');

router.get('/Profile', utility.isLoggedIn, function(req, res){
    console.log(req.user);
    res.render('Member/index.ejs', {user: req.user});
});

router.get('/Profile.json', function(req, res){
    var o = {};
    User.findOne({acc_id: req.user._id}, function(err, user){
        if(err) throw err;
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
            console.log(o);
            res.json(o);
        })
    }

});

router.get('/newUser', function(req, res){
    res.render('Member/newUser.ejs');
})

router.post('/newUser', function(req, res){
    var newUser = new User(req.body.user);
    newUser.acc_id = req.user._id;
    newUser.email = req.user.email;
    newUser.save(function(err){
        if(err){console.log(err)}
        else{console.log('User Created!')}
    });
    utility.addAllUserExperience(req.body.exp, newUser);
    utility.addAllUserEducation(req.body.edu, newUser);
    utility.addAllUserVolunteerExperience(req.body.vol, newUser);
    res.send(newUser);
});

router.post('/addEdu', function(req, res){
    res.send(utility.addEducation(req.body));
});

router.post('/addExp', function(req, res){
    res.send(utility.addExperience(req.body));
});

router.post('/addVol', function(req, res){
    res.send(utility.addVolunteer(req.body));
})

router.post('/removeEdu', function(req, res){
    console.log('reached!');
    // res.send(utility.removeEducation(req.body.id));
});

router.post('/removeExp', function(req, res){
    console.log('reached!');
    // res.send(utility.removeExperience(req.body.id));
});

router.post('/removeVol', function(req, res){
    console.log('reached!');
    // res.send(utility.removeVolunteer(req.body.id));
})

router.post('/removeUser', function(req, res){
    res.send(utility.removeUser(req.body.id));
})

module.exports = router;
