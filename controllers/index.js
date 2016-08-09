var express = require('express'),
    router = express.Router(),
    Job = require('../models/job'),
    moment = require('moment');

router.get('/', function(req, res){
    res.redirect('/Job');
});

module.exports = router;
