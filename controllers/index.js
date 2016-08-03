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
router.use('/', require('./profile.remove'));

router.get('/', function(req, res){
    // if(req.user) res.render('profile')
    // res.render('index', {
    //     user: req.user
    // });
    var o = {};
    Job.find({}, function(err, jobs){
        if(err) throw err;
        // res.send(jobs);
        console.log(jobs);
        if(jobs.length > 0){
            o[moment(jobs[jobs.length - 1].date_posted).format("LL")] = [];
            // o[jobs[jobs.length - 1].date_posted] = [];
            var indx = 0;
            for(var i = jobs.length - 1; i > 0; i--)
            {
                var currentDate = moment(jobs[i].date_posted).format("LL");
                for(date in o){
                    if(jobs[i].deadline >= Date.now()){
                        if(date == currentDate){
                            o[date].push(jobs[i]);
                            indx++;
                        } else if(date != currentDate){
                            var newDate = moment(jobs[i].date_posted).format('LL');
                            o[newDate] = [];
                            o[newDate].push(jobs[i]);
                            indx = 0;
                        }
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
