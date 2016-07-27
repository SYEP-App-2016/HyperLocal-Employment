var express = require('express'),
    router = express.Router(),
    Job = require('../models/job');

router.get('/jobListing', function(req, res){
    Job.find({}, function(err, jobs){
        if(err) throw err;
        // res.send(jobs);
        res.render('jobListings', {
            results: jobs,
            user: req.user
        });
    });
});

module.exports = router;
