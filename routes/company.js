var express = require('express'),
    router = express.Router(),
    Company = require('../models/company'),
    Job = require('../models/job'),
    ObjectId = require("mongoose").Types.ObjectId;

//Detail - Get
//Sends Found data as json
router.get('/Details/:id/data.json', function(req, res){
    var o = {}; //Initialize an empty array to store results
    Company.findOne({_id: req.params.id}, function(err, company){ //Finds a company that is linked to an account, temporarily set as an default acc
        o.c = company; //Stores Company results to o obj
        Job.find({'company._id': company._id}, function(err, jobs){ //Finds Jobs linked to a company
            o.jobs = jobs; //Stores Jobs results to o obj
            res.json(o); //Sets json infomation over to businessCtrl in js/controllers
        });
    });
});

//Renders to Details page
router.get('/Details/:id/', function(req, res){
    res.render('Business/details', {user: req.user}); //Tells server to render the Details page in the Business folder
});

//Add - Get
//Renders Business/Add page
router.get('/Add', function(req, res){
    res.render('Business/add', {user: req.user}); //Tells server to render the Add page in the Business folder
});

//Add - Post
//Post Request for new Business
router.post('/Add', function(req, res){
    var newBusiness = new Company(req.body); //Creates the new Business
    newBusiness.logo = '/img/company_logos/Logo_TV_2015.png'; //Sets the logo of the business, temp. until file upload is added
    newBusiness.save(function(err){ //Saves new Business to database
        if(err){console.log(err)}
        else{console.log('New Business Created!')}
    });
    res.send('/Business/Details/' + newBusiness._id);//Sends link to BusinessCtrl
})

module.exports = router;
