var express = require('express'),
    router = express.Router(),
    Company = require('../models/company');

router.get('/newCompany', function(req, res){
    res.render('newCompany', {
        user: req.user
    });
});

router.post('/registerCompany', function(req, res){
    var newCompany = new Company({
        company_name: req.body.company_name,
        company_address: req.body.address,
        url: req.body.url
    });
    newCompany.save(function(err, company){
        if(err) throw err;
        console.log('New Company Added!');
    });

    res.redirect('/company');
});

router.get('/company', function(req, res){
    res.render('company');
});

module.exports = router;
