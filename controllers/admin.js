var express = require('express'),
    router = express.Router(),
    util = require('../utility'),
    User = require('../models/user.js');



// router.get('/', util.isLoggedIn, function(req, res){
router.get('/', function(req, res){
    res.render('Admin/index', { user: req.user, title: "Administration Manager" });
});


router.get('/Members', function(req, res){
    
    User.find({}, function(err, user){
        res.render('Admin/member', { title: "Manager Members", user: user });
    });

});

module.exports = router;