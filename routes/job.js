var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    Company = require('../models/company'),
    moment = require('moment'),
    utility = require('../utility');

//// READ ////====>>>>

router.get('/Details/:id', function(req, res){
    res.render('Job/details');
});

router.get('/Details/:id/data.json', function(req, res){
    Job.findOne({_id: req.params.id}, function(err, data){
        res.json(data);
    });
});

router.get('/jobs.json', function(req,res){
    Job.find({}, function(err, jobs){
        var collection = {};
        if(jobs.length > 0){
            collection[moment(jobs[0].date_posted).format('LL')] = [];
            for(var i = 0; i < Object.keys(collection).length; i++) {

                var cur = Object.keys(collection)[i];
                  for(var x = 0; x < jobs.length; x++) {
                      if(moment(jobs[x].date_posted).format('LL') == cur){
                          collection[cur].push(jobs[x]);
                      } else
                      {
                          cur = moment(jobs[x].date_posted).format('LL');
                          collection[cur] = [];
                          collection[cur].push(jobs[x]);
                      }
                  }
              }
              res.json(collection);
        }
    });
});

router.get('/', function(req, res){
    res.render('Job/index');
});

//// CREATE ////====>>>>
router.get('/Add/:id', function(req, res){
    // console.log(req.params.id);
    res.render('Job/add');
});

router.post('/Add/:id', function(req, res){
    Company.findOne({_id: req.params.id}, function(err, company){
        var newJob = new Job(req.body);
        newJob.company.name = company.name;
        newJob.company._id = company._id;
        newJob.date_posted = new Date();
        newJob.logo = company.logo;
        newJob.save(function(err){
            if(err){console.log(err)}
            else{console.log('Job Posted!')}
        });
        res.send('/Business/Details/' + company._id);
    });
});

//// DELETE ////====>>>>>
router.post('/Remove/:id', function(req, req){
    console.log(req.body);
    // Job.findOneAndRemove({_id: req.params.id}, function(err){
    //     if(err) console.log(err);
    // })
});
module.exports = router;
