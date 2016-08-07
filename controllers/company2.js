var express = require('express'),
    router = express.Router(),
    Company = require('../models/company');

// CRUD

// CREATE
router.get('/Add', function(req, res){
    res.render('newCompany', {
        user: req.user
    });
});

router.post('/Add', function(req, res){
    var logos = ['Logo_TV_2015.png', 'apple.jpg', 'twitter/png'];
    if(req.body.logo == '') req.body.logo = '/img/company_logos/' + logos[Math.floor(Math.random()*logos.length)];

    var newCompany = new Company({
        company_name: req.body.company_name,
        company_address: req.body.address,
        company_city: req.body.city,
        company_state: req.body.state,
        company_zip_code: req.body.company_zip_code,
        logo: req.body.logo,
        url: req.body.url,
        acc_id: req.user._id,
        history: req.body.history
    });

    newCompany.save(function(err, company){
        if(err) throw err;
        console.log('New Company Added!');
    });

    res.redirect('/company');
});


// RETRIEVE - ALL
router.get('/', function(req, res){
    Company.find({}, function(err, company){
        res.render('Business/index', {
            user: req.user, company: company
        });
    });
});

// RETRIEVE - 1
router.get('Details/:id', function(req, res){
    Company.findOne({acc_id: req.user._id}, function(err, company){
        res.render('company', {
            user: req.user, company: company
        });
    });
});


// UPDATE ??


// DELETE - 1??


module.exports = router;
