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
                if(err) {return done(err);}
                else{
                    newAccount = new Account();

                    newAccount.email = email;
                    newAccount.password = newAccount.generateHash(password);

                    newAccount.save(function(err){
                        if(err) throw err;
                        return done(null, newAccount);
                    });
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

            if(!account) return done(null, false, req.flash('loginMessage', 'No User found.'))

            if(!account.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password.'))

            return done(null, account);
        });
    }));
