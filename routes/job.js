var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    Company = require('../models/company'),
    moment = require('moment'),
    utility = require('../utility');

//Details - Get
//Renders Jobs Details Page
router.get('/Details/:id', function(req, res){
    res.render('Job/details.ejs', {user: req.user}); //Tells server to render details page in Job folder
});
//Sends Json data on job details to server
router.get('/Details/:id/data.json', function(req, res){
    Job.findOne({_id: req.params.id}, function(err, data){ //Finds the Job
        // UPDATE VIEW COUNT BEFORE RESPONSE
        // NEXT UPDATE ASYNC METHOD

        try {
            Job.findOneAndUpdate(
                { _id: req.params.id},
                { $inc: { view_count: data.view_count, "view_count": 1 } },
                function(err, results) {
                    console.log(results);
                }
            );
        }
        catch(e) { //Catches Err and logs it
            console.log(e);
        }
        res.json(data); //Sends Job info to Job Ctrl
    });
});

//Renders Job's index page
router.get('/', function(req, res){
    res.render('Job/index.ejs', {user: req.user});
});

//Sends Json data to Index page, contains listing of jobs
router.get('/jobs.json', function(req,res){
    Job.find({}, function(err, jobs){ //Finds all the jobs
        var collection = {}; //Stores Newly sorted data
        if(jobs.length > 0){ //Checks to see if at least one job exists
            collection[moment(jobs[jobs.length - 1].date_posted).format('LL')] = []; //Sets the first item in collection to the oldest date
            for(var i = (Object.keys(collection).length - 1); i >= 0; i--) { //Loops through Collections


                var cur = Object.keys(collection)[i]; //Current date in loop is stored in cur
                  for(var x = (jobs.length - 1); x >= 0; x--) { //Loops through jobs
                      if(moment(jobs[x].date_posted).format('LL') == cur){ //Checks to see if the current job's date matches the current date, if yes, job is pushed into collection
                          collection[cur].push(jobs[x]);//Pushes job to collection
                      } else //If current job's date doesnt match the current date
                      {
                          cur = moment(jobs[x].date_posted).format('LL'); //Current become the current job's date
                          collection[cur] = []; //Date is added to collection
                          collection[cur].push(jobs[x]); //Job is pushed to date's collection
                      }
                  }
              }
              res.json(collection); //Sends Collection to JobsCtrl
        }
    });
});

//Add - Get
//Renders Job add page
router.get('/Add/:id', function(req, res){
    res.render('Job/add.ejs', {user: req.user});
});

//Add - Post
//Posts Request to create and add job to array
router.post('/Add/:id', function(req, res){
    Company.findOne({_id: req.params.id}, function(err, company){ //Finds the company posting job
        var newJob = new Job(req.body); //Creates new Job
        newJob.company.name = company.name; //Adds Company's name to job data
        newJob.company._id = company._id; //Adds Company's id to job data
        newJob.date_posted = new Date(); //Sets the date of job being posted to current date
        newJob.logo = company.logo; //Sets Job logo to company logo
        newJob.save(function(err){ //Saves Job data
            if(err){console.log(err)}
            else{console.log('Job Posted!')}
        });
        res.send('/Business/Details/' + company._id); //Sends link to jobCtrl
    });
});

//Remove Post, Currently doesnt work
router.post('/Remove/:id', function(req, req){
    console.log(req.body);
    // Job.findOneAndRemove({_id: req.params.id}, function(err){
    //     if(err) console.log(err);
    // })
});
module.exports = router;
