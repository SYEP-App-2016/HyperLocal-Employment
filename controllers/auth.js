var passport = require('passport'),
    Account = require('../models/account'),
    User = require('../models/user'),
    Company = require('../models/company'),
    express = require('express'),
    router = express.Router();

router.get('/register', function(req, res){
    res.render('signup', {message: req.flash('signupMessage'), user: req.user});
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/newUser',
    failureRedirect: '/register',
    failureFlash: true
}));

/* SHOULD BE IN COMPANY
router.get('/registerCompany', function(req, res){
    res.render('companySignUp', {message: req.flash('signUpMessage'), user: req.user});
});

router.post('/registerCompanyAccount', passport.authenticate('local-signup', {
    successRedirect: '/newCompany',
    failureRedirect: '/registerCompany',
    failureFlash: true
}));
*/

router.get('/login', function(req, res){
    res.render('login', {message: req.flash('loginMessage'), user: req.user});
});

// WHY IS COMPANY APART OF LOGGING IN?
router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/login',
    failureFlash: true
}), function(req, res){
    if(req.user.roleID == 0){
        User.findOne({acc_id: req.user._id}, function(err, user){
            if(!user){res.redirect('/newUser');}
            else{res.redirect('/profile');}
        });
    } else if(req.user.roleID == 1){
        Company.findOne({acc_id: req.user._id}, function(err, company){
            if(!company){res.redirect('/newCompany');}
            else{res.redirect('/company');}
        });
    }
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
