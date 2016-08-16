var express = require('express'),
    router = express.Router(),
    util = require('../utility'),
    User = require('../models/user.js'),
    Company = require('../models/company.js'),
    Job = require('../models/job.js');



// router.get('/', util.isLoggedIn, function(req, res){
router.get('/', function(req, res){
    res.render('Admin/index', { user: req.user, title: "Administration Manager" });
});

router.get('/Members', function(req, res){
    User.find({}, function(err, user){
        res.render('Admin/member', { title: "Manager Members", user: user });
    });
});

router.get('/data.json', function(req, res){
    var o = {};
    User.find({}, function(err, users){
        o.users = users;
        getComp();
    })

    function getComp(){
        Company.find({}, function(err, companies){
            o.companies = companies;
            getJobs();
        })
    }

    function getJobs(){
        Job.find({}, function(err, jobs){
            o.jobs = jobs;
            res.json(o);
        })
    }
});

module.exports = router;
