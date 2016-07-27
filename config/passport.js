var localStrategy = require('passport-local'),
    Account = require('../models/account'),
    User = require('../models/user'),
    passport = require('passport');

passport.serializeUser(function(account,done){
    done(null, account.id);
});
passport.deserializeUser(function(id, done){
    Account.findById(id, function(err, account){
        done(err, account);
    });
});
passport.use('local-signup',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            Account.findOne({'email': email}, function(err, account){
                if(err) return done(err)
                if(account){return done(null, false, req.flash('signupMessage', 'Email is already being used.'))}
                else{
                    // console.log(req.body.roleID);
                    newAccount = new Account();
                    newAccount.email = email;
                    newAccount.password = newAccount.generateHash(password);
                    if(req.body.roleID) newAccount.roleID = req.body.roleID;
                    newAccount.save(function(err){
                        if(err) throw err;
                        return done(null, newAccount);
                    });
                    // console.log(newAccount);
                }

            });
        });
    }
));
passport.use('local-login',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        Account.findOne({'email': email}, function(err, account){
            if(err) return done(err);
            if(!account) return done(null, false, req.flash('loginMessage', 'Invalid Email Address.'));
            if(!account.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password. Please Try Again.'));
            return done(null, account);
        });
    }));
