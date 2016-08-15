var express = require('express'),
    router = express.Router(),
    Job = require('../models/job');

router.get('/', function(req, res){
    res.redirect('/Job');
});

router.get('/Err', function(req, res){
    res.render('err');
})

module.exports = router;
