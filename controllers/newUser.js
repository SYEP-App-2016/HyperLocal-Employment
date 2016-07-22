var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

router.get('/newUser', function(req, res){
    res.render('newUser');
});

router.post('/newUser', function(req, res){
    var newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });

    newUser.save(function(err){
        if(err) throw err;
    });

    res.redirect('profile');
});

module.exports = router;
