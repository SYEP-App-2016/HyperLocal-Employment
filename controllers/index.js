var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    moment = require('moment');

router.use('/', require('./auth'));
router.use('/', require('./profile.get'));
router.use('/', require('./profile.post'));
router.use('/', require('./profile.update'));
router.use('/', require('./newUser'));
router.use('/', require('./jobListing'));
router.use('/', require('./jobs'));
router.use('/', require('./company'));

router.get('/', function(req, res){
    // if(req.user) res.render('profile')
    // res.render('index', {
    //     user: req.user
    // });
    var o = {};
    Job.find({}, function(err, jobs){
        if(err) throw err;
        // res.send(jobs);
        if(jobs.length > 0){
            o[moment(jobs[jobs.length - 1].date_posted).format("LL")] = [];
            // o[jobs[jobs.length - 1].date_posted] = [];
            var indx = 0;
            for(var i = 0; i < jobs.length; i++)
            {
                for(date in o){
                    if(date == moment(jobs[i].date_posted).format("LL")){o[date].push(jobs[i])}
                    indx++;
                    if(indx == Object.keys(o).length && date != moment(jobs[i].date_posted).format("LL")){
                        o[moment(jobs[i].date_posted).format("LL")] = [];
                        o[moment(jobs[i].date_posted).format("LL")].push(jobs[i]);
                        indx = 0;
                    }
                }
            }
        }
        console.log(o);
        // console.log(o);
        res.render('jobListings', {
            results: o,
            user: req.user,
            moment: moment
        });
    });
});

module.exports = router;
