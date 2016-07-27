var express = require('express'),
    router = express.Router(),
    Job = require('../models/job');

router.get('/newJob', function(req, res){
    res.render('job', {company: req.user});
});

router.post('/newJob', function(req, res){
    console.log(req.body)
    var newJob = new Job({
        jb_position: req.body.jb_position,
        jb_desc: req.body.jb_desc,
        jb_desc_teaser: req.body.jb_desc_teaser,
        jb_contact: req.body.jb_contact,
        req_skills: req.body.req_skills,
        date_posted: new Date(),
        deadline: req.body.deadline,
        url: req.body.url,
        company_id: req.body.company_id
    });
    newJob.save(function(err){
        if(err) throw err;
        console.log('New Job Posted!');
    });

    res.redirect('jobListing');
});

module.exports = router;
