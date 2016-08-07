var express = require('express'),
    router = express.Router(),
    Company = require('../models/company'),
    Job = require('../models/job'),
    func = require('./func.js');

router.get('/newCompany', function(req, res){
    res.render('newCompany', {
        user: req.user
    });
});

router.post('/registerCompany', function(req, res){
    var logos = ['Logo_TV_2015.png', 'apple.jpg', 'twitter/png'];
    if(req.body.logo == '') req.body.logo = '/img/company_logos/' + logos[Math.floor(Math.random()*logos.length)];

    var newCompany = new Company({
        company_name: req.body.company_name,
        company_address: req.body.address,
        logo: req.body.logo,
        url: req.body.url,
        acc_id: req.user._id,
        history: req.body.history
    });
    
    newCompany.save(function(err, company){
        if(err){console.log(err)}
        else{console.log('New Company Added!')}
    });

    res.redirect('/company');
});

router.get('/company', func.isLoggedIn, function(req, res){
    if(req.user.roleID == 0){res.redirect('/')}
    else{
        var o = {};
        Company.findOne({acc_id: req.user._id}, function(err, company){
            o.company = company;
            Job.find({company_id: company._id}, function(err, jobs){
                o.jobs = jobs;
                res.render('company', {
                    user: req.user,
                    results: o
                });
            });
        });
    }
});

router.post('/removeJob', function(req, res){
    Job.findOneAndRemove({_id: req.body.job_id}, function(err){
        if(err){console.log(err)}
        else{console.log('Job Removed!')}
        res.redirect('company');
    });
});

module.exports = router;
