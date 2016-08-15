var express = require('express'),
    router = express.Router(),
    Company = require('../models/company'),
    Job = require('../models/job'),
    ObjectId = require("mongoose").Types.ObjectId;

router.get('/Details/:id/data.json', function(req, res){
    var o = {};
    Company.findOne({_id: new ObjectId('57b1fdc6f4bf0140301ed32d')}, function(err, company){
        o.c = company;
        Job.find({'company._id': company._id}, function(err, jobs){
            o.jobs = jobs;
            console.log(o);
            res.json(o);
        });
    });
});

router.get('/Details/:id/', function(req, res){
    res.render('Business/details');
});

router.get('/Add', function(req, res){
    res.render('Business/add');
});

router.post('/Add', function(req, res){
    var newBusiness = new Company(req.body);
    newBusiness.logo = '/img/company_logos/Logo_TV_2015.png';
    newBusiness.save(function(err){
        if(err){console.log(err)}
        else{console.log('New Business Created!')}
    });
    res.send('/Business/Details/' + newBusiness._id);
})

module.exports = router;
