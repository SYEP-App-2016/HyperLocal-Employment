var express = require('express'),
    router = express.Router(),
    Company = require('../models/company'),
    ObjectId = require("mongoose").Types.ObjectId;

// CRUD

// CREATE
router.get('/Add', function(req, res){
    res.render('Business/add', {
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
        // acc_id: req.user._id,
        history: req.body.history
    });

    newCompany.save(function(err, company){
        if(err) throw err;
        console.log('New Company Added!');
    });

    res.redirect('Details/' + newCompany._id);
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
router.get('/Details/:id', function(req, res){
    Company.find({_id: new ObjectId( req.params.id) }, function(err, company){
        res.render('Business/detail', {
            user: req.user, results: company
        });
    });
});



// UPDATE ??
router.get('/Edit/:id', function(req, res){
    
    Company.find({_id: new ObjectId( req.params.id) }, function(err, company){
        res.render('Business/edit', {
            user: req.user, results: company
        });
    });
});

// DELETE - 1??



// TEST

module.exports = router;
