var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

router.get('/newUser', function(req, res){
    console.log(req);

    res.render('newUser', {user: req.user});
});

router.post('/newUser', function(req, res){
    var newUser = new User({
        obj: req.body.obj,
        home: req.body.home,
        cell: req.body.cell,
        job_interests: req.body.job_interests,
        acc_id: req.user._id
    });

    newUser.save(function(err){
        if(err) throw err;
        console.log('User Created!');
    });
    res.redirect('profile');
});

module.exports = router;
