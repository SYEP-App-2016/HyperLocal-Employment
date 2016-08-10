var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    Company = require('../models/company'),
    moment = require('moment');

// FIND BETTER WAY OF INCLUDING
var ObjectId = require('mongoose').Types.ObjectId;


// TEST METHOD
// GET DATA BY ID NEEDS -> require('mongoose').Types.ObjectId;
router.get('/Check', function(req, res){
     Company.find({ _id: new ObjectId('57a4e3307d8f51bc0d26dd12') },'_id company_name', function(err, d){
         console.log(d);
     });
     res.send("1");
});

router.get('/:company_id/Add', function(req, res){
    Company.findOne({_id: req.params.company_id}, function(err, comp){
        res.render('Job/add', {user: req.user, company: comp});
        console.log(comp);
    });
});

router.post('/:company_id/Add', function(req, res){
    // RETURNS AS ARRAY / GETS 1ST INDEX
    Company.findOne({ _id: req.params.company_id }, function(err, data){
         var newJob = new Job({
            jb_position: req.body.jb_position,
            jb_desc: req.body.jb_desc,
            jb_desc_teaser: req.body.jb_desc_teaser,
            jb_contact: req.body.jb_contact,
            pay_rt: req.body.pay_rt,
            sal: req.body.sal,
            catergory: req.body.catergory,
            req_skills: req.body.req_skills,
            date_posted: new Date(),
            deadline: req.body.deadline,
            url: req.body.url,
            logo: req.body.logo,
            company: {
                company_id: req.params.company_id,
                company_name: data.company_name
            }
        });

        newJob.save(function(err){
            if(err) throw err;
            console.log('New Job Posted!');
        });

        res.redirect('/Job');
     });

});


router.get('/', function(req, res){

    Job.find({}, function(err, data){

        var collection = [];

        for(var i = 0; i < data.length; i++){
            var j = {
                id: data[i]._id,
                title: data[i].jb_position,
                img: data[i].logo,
                teaser: data[i].jb_desc_teaser,
                date: moment(data[i].date_posted ).format("MMMM do YYYY"),
                category: data[i].catergory,
                views: data[i].view_count,
                company: {
                    id: data[i]._id,
                    name: data[i].company.company_name
                }
            };
            collection.push(j);
        }

        res.render('Job/index', {
            user: req.user, results: JSON.stringify( collection ) });
    });
});

router.get('/Details/:id', function(req, res){
    Job.findOne({ _id: new ObjectId(req.params.id) }, function(err, data){

        // UPDATE VIEW COUNT BEFORE RESPONSE
        // NEXT UPDATE ASYNC METHOD
        try {
            Job.findOneAndUpdate(
                { _id: new ObjectId(data._id) },
                { $inc: { view_count: data.view_count, "view_count": 1 } },
                function(err, results) {
                    console.log(results);
                }
            );
        }
        catch(e) {
            console.log(e);
        }
        // res.send({user: req.user, results: data});
        res.render('Job/details', {
            user: req.user,
            results: data
        });
    });
});

router.post('/Remove/:id', function(req, res){
    Job.findOneAndRemove({_id: req.params.id}, function(err){
        if(err){console.log(err)}
        else{console.log('Job Removed!')}
        res.redirect('/Business/Details/'+req.body.company_id);
    });
});

// MOVE TO GLOBAL UTILITY FUNC TO REQUIRE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}


module.exports = router;
