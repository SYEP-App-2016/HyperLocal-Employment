var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

router.get('/newUser', function(req, res){
    res.render('newUser', {user: req.user});
});

router.post('/newUser', function(req, res){
    var newUser = new User({
        f_name: req.body.f_name,
        m_init: req.body.m_init,
        l_name: req.body.l_name,
        obj: req.body.obj,
        home: req.body.home,
        cell: req.body.cell,
        email: req.user.email,
        address: (req.body.state) + " " + (req.body.city) + ", " + (req.body.state) + " " (req.body.zip),
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
