var passport = require('passport'),
    Account = require('../models/account'),
    User = require('../models/user'),
    Company = require('../models/company'),
    express = require('express'),
    router = express.Router(),
    utility = require('../utility');

router.get('/Signup', function(req, res){
    res.render('Auth/Signup', {message: req.flash('signupMessage')});
});

router.get('/user.json', function(req, res){
    res.json(req.user);
})

router.get('/Login', function(req, res){
    res.render('Auth/Login', {message: req.flash('loginMessage')});
});

router.post('/Signup', passport.authenticate('local-signup', {
    failureFlash: true
}), function(req, res){

})

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    // if(user){
    //     console.log(user);
    //     res.redirect('/Auth/Login');
    // }
    if(!user){
        console.log(user);
        res.redirect('/Auth/Login');
    }
  })(req, res, next);
});


// router.post('/Login', passport.authenticate('local-login', {
//     failureFlash: true
// }), function(req, res){
//     res.send(req.user);
// });

// router.get('/Steps', function(req, res){
//     res.render('member/steps', {user: req.user});
// });
//
// router.post('/newUser', function(req, res){
//     userData = JSON.parse(req.body.userData);
//     var newUser = new User(userData);
//     newUser.acc_id = req.user._id;
//     newUser.save(function(err){
//         if(err){console.log(err)}
//         else{console.log('User Created!')}
//     });
//     utility.addUserExperience(JSON.parse(req.body.expData), newUser);
//     utility.addUserEducation(JSON.parse(req.body.eduData), newUser);
//     utility.addUserVolunteerExperience(JSON.parse(req.body.volData), newUser);
//     res.redirect('/member/profile');
// });
//
// router.get('/Login', function(req, res){
//     res.render('auth/login', {message: req.flash('loginMessage'), user: req.user});
// });


router.get('/Logout', function(req, res){
    req.logout();
    res.redirect('/');
})

module.exports = router;
