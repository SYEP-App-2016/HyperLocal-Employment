var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

router.get('/newUser', function(req, res){
    res.render('newUser');
});

router.post('/newUser', function(req, res){
    var newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account_id: req.user._id
    });

    newUser.save(function(err){
        if(err) throw err;
        console.log('User Created!');
    });

    res.redirect('profile');
});

module.exports = router;
