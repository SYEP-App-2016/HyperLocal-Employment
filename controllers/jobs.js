var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    Company = require('../models/company'),
    moment = require('moment');

/*
router.get('/newJob', isLoggedIn, function(req, res){
    Company.findOne({acc_id: req.user._id}, function(err, comp){
        console.log(comp);
        res.render('job', {user: req.user, company: comp});
    });
});

router.post('/newJob', function(req, res){
    console.log(req.body.req_skills);
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
        company_id: req.body.company_id
    });
    newJob.save(function(err){
        if(err) throw err;
        console.log('New Job Posted!');
    });

    res.redirect('/');
});
*/


/*
// DON'T DO GENERIC ROUTING - IT TAKES EVERYTHING!
// 
router.get('/:id/:jb_position', function(req, res){
    Job.findOne({_id: req.params.id}, function(err, job){
        if(err) console.log(err);
        // job.view_count  = job.view_count+1;
        job.save(function(err){
             if(err){console.log(err)}
        });
        Company.findOne({_id: job.company_id}, function(err, company){
            res.render('jobDetails', {
                user: req.user,
                job: job,
                company: company
            });
        });
    });
});
*/


function isLoggedIn(req, res, next){
    if(req.isAuthenticated() && req.user.roleID == 1) return next();
    res.redirect('/');
}

module.exports = router;
